import axios from "axios";
import { useState, ChangeEvent } from "react";
import { createRide, bookRide } from "../../redux/rideSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

type GeoapifyFeature = {
  properties: {
    place_id: string;
    formatted: string;
  };
};

const GEOAPIFY_API_KEY = '2281a2f8f9a5423a8f098f4ebced18fc';
const Find = () => {
  const [pickup, setPickup] = useState<string>('');
  const [pickupSuggestions, setPickupSuggestions] = useState<GeoapifyFeature[]>([]);
  const [dropoff, setDropoff] = useState<string>('');
  const [dropoffSuggestions, setDropoffSuggestions] = useState<GeoapifyFeature[]>([]);
  const [vehicleType, setVehicleType] = useState("");
  const [price, setPrice] = useState("");
  const [time , setTime] = useState<string>('');
  const [userType , setUserType] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchSuggestions = (
    input: string,
    setSuggestions: React.Dispatch<React.SetStateAction<GeoapifyFeature[]>>
  ) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    axios
      .get(`https://api.geoapify.com/v1/geocode/autocomplete`, {
        params: {
          text: input,
          apiKey: GEOAPIFY_API_KEY,
        },
      })
      .then((response) => {
        setSuggestions(response.data.features);
      })
      .catch((error) => console.error('Geoapify API error:', error));
  };


  const handleCreateRide = () => {
    if (token) {
      dispatch(
        createRide(
       {
          starting_coordinates: pickup,
          ending_coordinates: dropoff,
          ride_time: time,
          price,
          vehicle_type: vehicleType,
        })
      );
    } else {
      console.error("User ID not found. Please log in.");
    }
  }

  const handleBookRide = () => {
    dispatch(
      bookRide({
        starting_coordinates: pickup,
        ending_coordinates: dropoff,
      })
    );
    navigate("/ridefoundlist")
  };

  return (
    <div className="flex justify-center items-center bg-white px-4 md:px-6 mt-15">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Left Form Section */}
        <div className="space-y-11">
          <h1 className="text-5xl font-bold text-black">Go anywhere--Go Together</h1>

          {/* Tabs */}
          <div className="flex space-x-6 border-b pb-2">
            <button
            onClick={()=>setUserType(true)}
             className={`flex items-center space-x-2 font-medium pb-2 px-4 py-2 rounded-lg 
              ${userType ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
              {/* <span className="text-lg">🚗</span> */}
              <span>Create Ride</span>
            </button>
            <button 
            onClick={()=>setUserType(false)}
            className={`flex items-center space-x-2 font-medium pb-2 px-4 py-2 rounded-lg 
              ${!userType ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
              {/* <span className="text-lg">🚗</span> */}
              <span>Book Ride</span>
            </button>
          </div>

          {/* Input Fields */} 
          
            <div className="space-y-4">
              {/* Pickup Input */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 p-3 rounded-md">
                  <span className="text-lg">⚫</span>
                  <input
                    type="text"
                    placeholder="Pickup location"
                    value={pickup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPickup(e.target.value);
                      fetchSuggestions(e.target.value, setPickupSuggestions);
                    }}
                    className="bg-transparent w-full ml-3 focus:outline-none"
                  />
                  <button className="text-gray-500">📍</button>
                </div>
                {pickupSuggestions.length > 0 && (
                  <ul className="absolute bg-white border w-full rounded-md z-10 max-h-40 overflow-y-auto">
                    {pickupSuggestions.map((place) => (
                      <li
                        key={place.properties.place_id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setPickup(place.properties.formatted);
                          setPickupSuggestions([]);
                        }}
                      >
                        {place.properties.formatted}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Dropoff Input */}
              <div className="relative">
                <div className="flex items-center bg-gray-100 p-3 rounded-md">
                  <span className="text-lg">⬛</span>
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    value={dropoff}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setDropoff(e.target.value);
                      fetchSuggestions(e.target.value, setDropoffSuggestions);
                    }}
                    className="bg-transparent w-full ml-3 focus:outline-none"
                  />
                </div>
                {dropoffSuggestions.length > 0 && (
                  <ul className="absolute bg-white border w-full rounded-md z-10 max-h-40 overflow-y-auto">
                    {dropoffSuggestions.map((place) => (
                      <li
                        key={place.properties.place_id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setDropoff(place.properties.formatted);
                          setDropoffSuggestions([]);
                        }}
                      >
                        {place.properties.formatted}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {userType? 
            <div> 
            <div className="flex space-x-4 items-center mt-5 mb-5"> 
                <input
                  type="time"
                  value={time}
                  onChange={(e)=>{setTime(e.target.value)}}
                  className="bg-gray-100 px-4 py-2 rounded-md w-1/3"
                />
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                  className="bg-gray-100 px-4 py-2 rounded-md w-1/3"
                />
                <select
                  value={vehicleType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setVehicleType(e.target.value)}
                  className="bg-gray-100 px-4 py-2 rounded-md w-1/3"
                >
                  <option value="">Select vehicle type</option>
                  <option value="two-wheel">Two-Wheel</option>
                  <option value="4-wheeler-1">4-Wheeler-1</option>
                  <option value="4-wheeler-2">4-Wheeler-2</option>
                  <option value="4-wheeler-3">4-Wheeler-3</option>
                </select>
              </div>
            <div className="space-y-2">
              <button 
              onClick={handleCreateRide} 
               className="w-full bg-black text-white font-semibold py-3 rounded-md">
                Create Ride
              </button>
              {/* <p className="text-center text-gray-600">
                Log in to see your recent activity
              </p> */}
            </div>
          </div> :  
          <div> 
               <div className="flex space-x-4 items-center mt-5 mb-5"> 
                <input
                  type="time"
                  className="bg-gray-100 px-4 py-2 rounded-md w-1/3"
                />
                <select
                  value={vehicleType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setVehicleType(e.target.value)}
                  className="bg-gray-100 px-4 py-2 rounded-md w-1/3"
                >
                  <option value="">Select vehicle type</option>
                  <option value="two-wheel">Two-Wheel</option>
                  <option value="4-wheeler-1">4-Wheeler-1</option>
                  <option value="4-wheeler-2">4-Wheeler-2</option>
                  <option value="4-wheeler-3">4-Wheeler-3</option>
                </select>
              </div>
            <div className="space-y-2">
              <button 
              onClick={handleBookRide}
              className="w-full bg-black text-white font-semibold py-3 rounded-md">
                Find Ride
              </button>
              {/* <p className="text-center text-gray-600">
                Log in to see your recent activity
              </p> */}
            </div>
          </div> } 
      </div> 

        {/* Right Map Section */}
        <div className="hidden md:block ml-10">
          <div className="w-full h-[530px] bg-gray-300 rounded-md">
            <iframe
              className="w-full h-full rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093864!2d144.95373531590404!3d-37.816279742021115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774a5fd3d9a7e3!2sMelbourne!5e0!3m2!1sen!2sau!4v1614036364099!5m2!1sen!2sau"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;

