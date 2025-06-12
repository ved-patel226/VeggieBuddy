import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

interface Restaurant {
  place_id: string;
  name: string;
  vicinity?: string;
  rating?: number;
}

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/restaurants?q=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Restaurant[]) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <h1>Veggiebuddy</h1>

      <input
        type="text"
        placeholder="Search restaurants by name..."
        value={query}
        onChange={handleChange}
        style={{ padding: 10, fontSize: 16, width: "100%", marginBottom: 20 }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && restaurants.length === 0 && (
        <p>No restaurants found.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {restaurants.map((r) => (
          <li
            key={r.place_id}
            style={{
              padding: 15,
              marginBottom: 15,
              backgroundColor: "#f0f0f0",
              borderRadius: 6,
            }}
          >
            <strong>{r.name}</strong>
            <br />
            {r.vicinity ?? "No address available"}
            <br />
            Rating: {r.rating ?? "N/A"}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
