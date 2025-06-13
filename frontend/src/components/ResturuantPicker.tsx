import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

interface Restaurant {
  veg_items: any;
  place_id: string;
  name: string;
  vicinity?: string;
  rating?: number;
}

const RestaurantPicker: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `http://127.0.0.1:5000/api/restaurants?q=${encodeURIComponent(query)}`
    )
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
    <section className="relative w-full min-h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden py-16">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full opacity-80">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4ade80"
              fillOpacity="0.2"
              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,181.3C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full opacity-30">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#86efac"
              fillOpacity="0.3"
              d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        <div
          className={`mx-auto transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 text-center">
            Find
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mx-2">
              Veggie-Friendly
            </span>
            Restaurants
          </h1>

          <div className="relative mb-12">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-30 blur-md"></div>
            <input
              type="text"
              placeholder="Search for vegetarian restaurants near you..."
              value={query}
              onChange={handleChange}
              className="text-[#00a63e] relative w-full px-6 py-4 bg-white rounded-full text-lg shadow-lg border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {loading && (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}

          {!loading && !error && restaurants.length === 0 && (
            <div className="text-center text-gray-600 my-12">
              <p className="text-xl">No restaurants found.</p>
              <p className="mt-2">Try adjusting your search terms.</p>
            </div>
          )}

          <div
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.place_id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl hover:border-green-200 transition-all hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {restaurant.vicinity ?? "No address available"}
                  </p>
                  <div className="flex items-center">
                    <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700 font-medium">
                        {restaurant.rating
                          ? restaurant.rating.toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center bg-green-50 px-3 py-1 rounded-full mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 10h16M10 14h4m-7 4h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-700 font-medium">
                        {typeof restaurant.veg_items === "number"
                          ? restaurant.veg_items
                          : "N/A"}
                      </span>
                    </div>
                    <a
                      href={`/restaurant/${restaurant.place_id}`}
                      className="ml-auto inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-medium transition-colors"
                    >
                      <span className="text-white">View Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantPicker;
