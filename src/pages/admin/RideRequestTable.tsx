import Ride from "../../types/admins/RideRequest";

interface RideTableProps {
  rides: Ride[];
  onDelete: (id: number) => void;
}

const RideRequestTable = ({ rides, onDelete }: RideTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Ride ID</th>
            <th className="px-4 py-2">Rider Name</th>
            <th className="px-4 py-2">Start Location</th>
            <th className="px-4 py-2">End Location</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rides.map((ride) => (
            <tr key={ride.ride_id}>
              <td className="px-4 py-2">{ride.ride_id}</td>
              <td className="px-4 py-2">{ride.user_name}</td>
              <td className="px-4 py-2">{ride.starting_coordinates}</td>
              <td className="px-4 py-2">{ride.ending_coordinates}</td>
              <td className="px-4 py-2">${ride.price}</td>
              <td className="px-4 py-2">
                <span className={`px-3 py-1 rounded-md ${
                    ride.status === "pending" ? "bg-yellow-300" :
                    ride.status === "completed" ? "bg-green-300" :
                    ride.status === "cancelled" ? "bg-red-300" :
                    "bg-gray-300"
                  }`}
                >
                  {ride.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <button className="bg-red-500 px-2 py-1 text-white rounded" onClick={() => onDelete(ride.ride_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RideRequestTable;
