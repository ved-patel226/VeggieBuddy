import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-green-200 via-green-100 to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#bbf7d0"
            fillOpacity="0.5"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 text-center drop-shadow-lg">
          Welcome to VeggieBuddy
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-green-700 text-center max-w-2xl">
          Discover delicious plant-based recipes, track your nutrition, and join
          a vibrant community of veggie lovers!
        </p>
        <a
          href="#get-started"
          className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold shadow-lg transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
