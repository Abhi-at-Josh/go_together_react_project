// import { useState } from "react";
import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
  
const LandingPage = () => {
  // const [pickup, setPickup] = useState<string>("");
  // const [dropoff, setDropoff] = useState<string>("");
  const navigate = useNavigate();
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="bg-black-500 text-black py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Go-Together</h1>
          <div>
            <button onClick={() => scrollToSection('about')} className="mr-4 font-semibold hover:underline">About</button>
            {/* <button onClick={() => scrollToSection('services')} className="mr-4 font-semibold hover:underline">Services</button> */}
            <button onClick={() => scrollToSection('ride-options')} className="mr-4 font-semibold hover:underline">Ride</button>
            <button onClick={() => navigate('login')} className="mr-4 font-semibold hover:underline">Login</button>
            <button onClick={() => navigate('signup')} className="font-semibold hover:underline">Sign Up</button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center text-center flex flex-col items-center justify-center p-6"
        style={{ background: "url('https://rapido-app-assets.storage.googleapis.com/66e1052cdca1e68cc52d070e8c9631aa_1736774712641.png')" }}>
        <h1 className="text-5xl font-bold drop-shadow-lg">Find or Offer a Ride with Go-Together</h1>
        <p className="mt-3 text-lg drop-shadow-md">Seamless intra-city car and bike pooling</p>
        <div className="mt-6">
          <Link to="login" className="px-6 py-3 bg-black text-white font-bold rounded-lg hover :bg-gray-800 mr-4">Login</Link>
          <Link to="signup" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600">Sign Up</Link>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto my-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Go-Together</h2>
        <p className="text-lg text-gray-700">Go-Together is an intra-city carpool and bike-pool platform designed to help commuters share rides, save costs, and reduce traffic congestion.</p>
      </div>

      {/* Ride Options Section */}
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

      {/* Footer */}
      <footer className="bg-White text-black text-center py-6 mt-12">
        <p>&copy; 2025 Go-Together. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/terms" className="mr-4 hover:underline">Terms & Conditions</Link>
          <Link to="/privacy" className="mr-4 hover:underline">Privacy Policy</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </div>
        <div className="mt-4">
          <p>Follow us on:</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:underline flex items-center gap-2"><FaFacebook /> Facebook</a>
            <a href="#" className="hover:underline flex items-center gap-2"><FaTwitter /> Twitter</a>
            <a href="#" className="hover:underline flex items-center gap-2"><FaInstagram /> Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
