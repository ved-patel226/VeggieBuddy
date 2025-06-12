import React, { useEffect, useState } from "react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden">
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
      <div className="flex flex-row w-full justify-center items-center">
        <div
          className={`lg:w-1/2 lg:pr-8 z-10 transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              VeggieBuddy
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            Discover endless suitable restuarants for your dietary needs!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#get-started"
              className="inline-block w-full sm:w-auto text-center px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white !no-underline rounded-full font-medium shadow-lg transition-all hover:shadow-green-200 hover:shadow-xl hover:-translate-y-1"
            >
              <span className="text-white">Get Started</span>
            </a>
            <a
              href="#learn-more"
              className="inline-block w-full sm:w-auto text-center px-8 py-3.5 bg-white border border-green-200 hover:border-green-400 text-green-700 !no-underline rounded-full font-medium transition-all hover:-translate-y-1"
            >
              <span className="text-green-600">Learn More</span>
            </a>
          </div>
        </div>
        <div
          className={`lg:w-1/2 mt-12 lg:mt-0 z-10 transition-all duration-1000 delay-300 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 opacity-30 blur-xl"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1684&q=80"
                alt="Vegetable spread"
                className="w-full h-[80vh] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
