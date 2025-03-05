// import User from "../../types/admins/user";
type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  
type Props = {
  users: User[];
  onDelete: (id: number) => void;
};

const UserList = ({ users, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md bg-white">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900">User ID</th>
            <th className="px-4 py-2 font-medium text-gray-900">Name</th>
            <th className="px-4 py-2 font-medium text-gray-900">Email</th>
            <th className="px-4 py-2 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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

export default UserList;
