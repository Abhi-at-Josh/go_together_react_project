import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities, deleteEntity } from "../../redux/adminslice/entities";
import { RootState, AppDispatch } from "../../redux/store";
import RideList from "./RideList";

const RideView = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Ensure `rides` is an array; otherwise, use an empty array
  const { rides, loading, error } = useSelector((state: RootState) => ({
    rides: Array.isArray(state.entities.rides) ? state.entities.rides : [],
    loading: state.entities.loading,
    error: state.entities.error,
  }));

  useEffect(() => {
    dispatch(fetchEntities("rides"));
  }, [dispatch]);

  const handleDelete = (rideId: number) => {
    if (window.confirm("Are you sure you want to delete this ride?")) {
      dispatch(deleteEntity({ entityType: "rides", id: rideId }));
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-12 p-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Ride Requests</h2>
      <div className="rounded-lg border border-gray-200 shadow-md bg-white">
        <RideList rides={rides} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default RideView;
