import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities, deleteEntity } from "../../redux/adminslice/entities";
import RideRequestTable from "./RideRequestTable";
import { RootState, AppDispatch } from "../../redux/store";

const RideRequestView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { riderequest, loading, error } = useSelector((state: RootState) => state.entities);

  useEffect(() => {
    dispatch(fetchEntities("ride_requests"));
  }, [dispatch]);

  const handleDelete = (rideId: number) => {
    if (window.confirm("Are you sure you want to delete this ride?")) {
      dispatch(deleteEntity({ entityType: "ride_requests", id: rideId }));
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-12 p-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Ride Requests</h2>
      <div className="rounded-lg border border-gray-200 shadow-md bg-white">
        <RideRequestTable rides={riderequest.rides || []} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default RideRequestView;
