import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { requestRide } from "../../redux/rideSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "../../components/ConfirmBox";
const RideFoundResult = () => {
  const rideData = useSelector((state: RootState) => state.ride?.rides || []);
  const rides = Array.isArray(rideData.rides)? rideData.rides: [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ride, loading, error } = useSelector((state: RootState) => state.ride);
  const [showConfirm , setShowConfirm] = useState (false);
  const [selectedRideId, setSelectedRideId] = useState<number | null>(null);
  const handleRideRequest = (result: boolean) => {
    setShowConfirm(false);
    if (result && selectedRideId !== null) {
      console.log("User confirmed ride with ID:", selectedRideId);
      dispatch(requestRide({ ride_request_id: selectedRideId }));
      navigate("/user");
      window.alert("ride booked sucessfully you will recive an email with all information")
    } else {
      navigate("/user")
      console.log("User canceled!");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
          {showConfirm && <ConfirmBox onConfirm={handleRideRequest} />}
      <div className="w-full max-w-4xl p-6 bg-white shadow- 2xl rounded-lg overflow-hidden max-h-[80vh]">
        {/* Sticky Heading */}
        <h2 className="text-2xl font-bold text-center text-black bg-white py-3 shadow-md sticky top-0 z-10">
          Available Rides
        </h2>

        {/* Ride List (with hidden scrollbar) */}
        <div className="space-y-5 overflow-y-auto max-h-[70vh] scrollbar-hide">
          {rides.length > 0 ? (
            rides.map((ride) => (
              <div
                key={ride.ride_id}
                className="p-5 border rounded-lg bg-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                {/* Left Section (Ride Info) */}
                <div className="w-full sm:w-3/4">
                  <h3 className="text-lg font-semibold text-black">
                    {ride.user_name} <span className="text-gray-500 text-sm">(Age: {ride.user_age})</span>
                  </h3>
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium text-black">From:</span> {ride.starting_coordinates}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-black">To:</span> {ride.ending_coordinates}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-black">Time:</span> {new Date(ride.ride_time).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-black">Vehicle:</span> {ride.vehicle_type}
                  </p>
                  {ride.price !== null && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-black">Price:</span> ₹{ride.price}
                    </p>
                  )}
                </div>

                {/* Right Section (Buttons) */}
                <div>
                  <button 
                    onClick={() => {
                      setSelectedRideId(ride.ride_id);
                      setShowConfirm(true);
                    }}
                    className="rounded-sm bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                    Yes, Confirm Ride
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No ride requests available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideFoundResult;
