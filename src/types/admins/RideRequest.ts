// src/types/admins/RideRequest.ts
interface RideRequest {
    ride_id: number;
    user_name: string;
    user_age: number;
    starting_coordinates: string;
    ending_coordinates: string;
    price: number;
    status: string;
  }
  export default RideRequest;

  