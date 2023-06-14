import React from "react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <div className="z-20 min-h-full h-[65vh] max-w-screen-xl mx-auto flex space-x-7 items-center">
      <div className="flex flex-col space-y-6">
        <h1 className="text-5xl font-extrabold text-slate-800 ">
          <span className="text-6xl text-green-300 underline">MPS:</span>
          <span> Revolutionizing Project Management </span>
        </h1>
        <p className="text-gray-500 text-lg">
          Maximize Efficiency, Optimize Resources, and Accelerate Project
          Delivery for Unparalleled Productivity Gains{" "}
        </p>

        <div className="flex space-x-3 items-center">
          <Link to="/register">
            <button className="text-white px-10 p-1 flex space-x-2 items-center rounded-full bg-slate-800 text-lg font-semibold">
              <span className="text-2xl animate-wiggle">👉</span>
              <span>Secure My Inbox Now! </span>
            </button>
          </Link>
        </div>
      </div>
      <img src="/hero.png" className="h-3/4" alt="hero img" />
    </div>
  );
};

export default HeroSection;
