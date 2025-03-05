import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRideRequests } from "../../redux/rideRequestSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rides, error } = useSelector((state: RootState) => state.rideRequest);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  // Track whether rides have been updated
  const [ridesUpdated, setRidesUpdated] = useState(false);
  const [userName, setUserName] = useState(""); // Store the rider's name dynamically
  console.log(rides);
  
  useEffect(() => {
    if (userId) {
      dispatch(fetchRideRequests(Number(userId))).then(() => {
        setRidesUpdated(true); // Ensure UI updates after fetching
      });
    }
  }, [dispatch, userId]);

  // Find the current user's name from the rides
  useEffect(() => {
    if (rides.length > 0) {
      const rider = rides.find((ride) => ride.rider_name)?.rider_name;
      if (rider) setUserName(rider);
    }
  }, [rides]);

  // Filter rides where the logged-in user is either the passenger or the rider
  const userRides = rides.filter(
    (ride) => ride.passenger_name === userName || ride.rider_name === userName
  );

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("user_id"); // Remove user ID
    navigate("/login"); // Redirect to login page
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img
          className="w-24 h-24 rounded-full border-4 border-blue-500"
          src="https://via.placeholder.com/100"
          alt="Profile"
        />
        <div>
          <h2 className="text-2xl font-semibold">{userName || "Loading..."}</h2>
          <p className="text-gray-600">user@example.com</p>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>
      </div>

      {/* Ride History Section */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-2">Ride History</h3>

        {/* Loading State */}
        {!ridesUpdated ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : userRides.length > 0 ? (
          userRides.map((ride) => (
            <div key={ride.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 mb-3">
              <h2 className="text-lg text-black">{ride.starting_coordinates} ➝ {ride.ending_coordinates}</h2>
              <p className="text-black">
                Passenger: <span className="font-medium text-yellow-400">{ride.passenger_name}</span>
              </p>
              <p className="text-black">
                Rider: <span className="font-medium text-violet-400">{ride.rider_name}</span>
              </p>
              <p className="text-black">
                Status: <span className="font-medium text-blue-400">{ride.status}</span>
              </p>
              <p className="text-black">
                Price: <span className="font-medium text-green-400">₹{ride.price}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No ride history found.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
        <button 
        onClick={handleLogout}  
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
