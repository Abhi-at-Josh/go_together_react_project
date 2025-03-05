// src/types/admins/RideRequest.ts
interface Ride {
    id: number;
    passenger_name: string;
    rider_name: string;
    starting_coordinates: string;
    ending_coordinates: string;
    price: number;
    status: string;
  }
  export default Ride;

  