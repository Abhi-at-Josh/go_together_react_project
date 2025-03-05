import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities, deleteEntity } from "../../redux/adminslice/entities"; // Correct import
import UserList from "./UserList"; 
import { RootState, AppDispatch } from "../../redux/store";

const UserView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.entities); // Fix: Use `entities`

  useEffect(() => {
    dispatch(fetchEntities("users")); // Fetch users dynamically
  }, [dispatch]);

  const handleDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteEntity({ entityType: "users", id: userId })); 
      // Delete dynamically
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-12 p-4">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">User List</h2>
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default UserView;
