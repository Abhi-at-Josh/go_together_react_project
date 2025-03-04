import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRideRequest, fetchRideRequests } from "../../redux/rideRequestSlice";
import { RootState, AppDispatch } from "../../redux/store";

type RideRequestsProps = {
  menuOpen: boolean;
};

const RideRequests: React.FC<RideRequestsProps> = ({ menuOpen}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rides, loading, error } = useSelector((state: RootState) => state.rideRequest);
  const userId = localStorage.getItem("user_id");
  
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      dispatch(fetchRideRequests(Number(userId))); // Fetch all ride requests
    }
  }, [dispatch]);
 
  const handleAccept = () => {
    if(userId){
      dispatch(acceptRideRequest({id:Number(userId) , status:"accepted"}))
    }
  }
  
  const handleReject = () => {
    if(userId){
      dispatch(acceptRideRequest({id:Number(userId) , status:"rejected"}))
    }
  }

  return (
    <div className={`fixed top-16 right-4 bg-gray-300 text-white rounded-lg shadow-lg p-4 w-80 transition-all duration-500 overflow-y-auto max-h-150 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <h1 className="text-xl font-bold text-black text-center mb-4">Ride Requests</h1>
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : rides.length > 0 ? (
          rides.map((ride) => (
            <div key={ride.id} className="bg-gray-100 p-4 rounded-lg shadow-md border-l-4 border-red-500 transition transform hover:scale-105">
              <h2 className="text-lg  text-black">{ride.starting_coordinates} ➝ {ride.ending_coordinates}</h2>
              <p className="text-black">Passenger: <span className="font-medium text-yellow-400">{ride.passenger_name}</span></p>
              <p className="text-black">Rider: <span className="font-medium text-violet-400">{ride.rider_name}</span></p>
              <p className="text-black">Status: <span className="font-medium text-blue-400">{ride.status}</span></p>
              <p className="text-black">Price: <span className="font-medium text-green-400">₹{ride.price}</span></p>
              <div className="flex justify-between mt-3">
                <button className="px-4 py-1 bg-green-200 text-green-600 font-semibold rounded-lg shadow-md hover:bg-green-400 transition"  onClick={() => handleAccept()}>Accept</button>
                <button className="px-4 py-1 bg-red-200 text-red-600 font-semibold rounded-lg shadow-md hover:bg-red-400 transition" onClick={() => handleReject()}>Reject</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No ride requests available.</p>
        )}
      </div>
    </div>
  );
};

export default RideRequests;
