import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface RestaurantData {
  business_status: string;
  name: string;
  vicinity: string;
  rating: number;
  img: string;
  user_ratings_total: number;
  price_level: number;
  opening_hours: {
    open_now: boolean;
  };
  photos?: Array<{
    photo_reference: string;
    html_attributions: string[];
  }>;
}
import { useSearchParams } from "react-router-dom";

const RestaurantView: React.FC = () => {
  const { placeid } = useParams<{ placeid: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const preference = searchParams.get("preference");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/restaurant?placeid=${encodeURIComponent(
            placeid ?? ""
          )}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [placeid]);

  // Price level to $ representation
  const priceLevel = restaurant?.price_level
    ? Array(restaurant.price_level).fill("$").join("")
    : "N/A";

  console.log(restaurant?.img);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden py-16">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30"
        style={{
          backgroundImage: restaurant?.img ? `url(${restaurant.img})` : "none",
        }}
      ></div>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {!restaurant?.img && (
          <>
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
          </>
        )}
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        <div
          className={`mx-auto max-w-3xl transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
              <p className="text-red-700">Error loading restaurant: {error}</p>
            </div>
          ) : !restaurant ? (
            <div className="text-center text-gray-600 my-12">
              <p className="text-xl">No restaurant data found</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                    {restaurant.name}
                  </span>
                </h1>

                <div className="flex items-center mb-6 space-x-2">
                  {restaurant.opening_hours?.open_now !== undefined && (
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        restaurant.opening_hours.open_now
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {restaurant.opening_hours.open_now
                        ? "Open now"
                        : "Closed now"}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-4 flex-wrap">
                    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-800 font-medium">
                        {restaurant.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        /5 ({restaurant.user_ratings_total} reviews)
                      </span>
                    </div>

                    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-800 font-medium">
                        {priceLevel}
                      </span>
                    </div>

                    <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-800 font-medium">
                        {preference &&
                        typeof (restaurant as Record<string, any>)[
                          preference
                        ] === "number"
                          ? `${
                              (restaurant as Record<string, any>)[preference]
                            } ${preference.split("_")[0]} items`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                  <p className="text-gray-700">{restaurant.vicinity}</p>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                  <a
                    href="/restaurants"
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-medium transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="text-white"> Back to Restaurants</span>
                  </a>
                  {restaurant && (
                    <a
                      href={`https://www.google.com/maps/place/?q=place_id:${placeid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span className="text-white">View on Google</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RestaurantView;
