import Ride from "../../types/admins/Ride";

interface RideTableProps {
  rides: Ride[];
  onDelete: (id: number) => void;
}

const RideList = ({ rides, onDelete }: RideTableProps) => {
    console.log(rides);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Ride ID</th>
            <th className="px-4 py-2">Passenger Name</th>
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
            <tr key={ride.id}>
              <td className="px-4 py-2">{ride.id}</td>
              <td className="px-4 py-2">{ride.passenger_name}</td>
              <td className="px-4 py-2">{ride.rider_name}</td>
              <td className="px-4 py-2">{ride.starting_coordinates}</td>
              <td className="px-4 py-2">{ride.ending_coordinates}</td>
              <td className="px-4 py-2">${ride.price}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-md ${
                    ride.status === "pending"
                      ? "bg-yellow-300"
                      : ride.status === "requested"
                      ? "bg-green-300"
                      : ride.status === "rejected "
                      ? "bg-red-300"
                      : "bg-gray-300"
                  }`}
                >
                  {ride.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-red-500 px-2 py-1 text-white rounded"
                  onClick={() => onDelete(ride.id)} // Fixed incorrect reference
                >
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

export default RideList;
