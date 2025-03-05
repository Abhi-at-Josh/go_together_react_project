// import { useState } from "react";
import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import LandingPageNav from "../../components/LandingPageNav";
  
const LandingPage = () => {
  // const [pickup, setPickup] = useState<string>("");
  // const [dropoff, setDropoff] = useState<string>("");


  return (
    <div className="min-h-screen bg-white text-black">
      <LandingPageNav/>
      <HeroSection/>
      {/* About Section */}
      <div id="about" className="container mx-auto my-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Go-Together</h2>
        <p className="text-lg text-gray-700">Go-Together is an intra-city carpool and bike-pool platform designed to help commuters share rides, save costs, and reduce traffic congestion.</p>
      </div>
      <div id="ride-options" className="max-w-5xl mx-auto mt-10 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center p-6 bg-white text-white rounded-lg shadow-2xl text-center">
          <FaCarSide className="text-black text-6xl" />
          <h2 className="text-xl font-semibold mt-4">Car Pool</h2>
          <p className="text-black mt-2">Share a ride with car owners traveling your way.</p>
          <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600">Find a Car Ride</button>
        </div>
        <div className="flex flex-col items-center p-6 bg-white text-white rounded-lg shadow-2xl text-center">
          <FaMotorcycle className="text-black text-6xl" />
          <h2 className="text-xl font-semibold mt-4">Bike Pool</h2>
          <p className="text-black mt-2">Quick and cost-effective bike rides within the city.</p>
          <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600">Find a Bike Ride</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LandingPage;
