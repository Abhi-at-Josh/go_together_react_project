import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import Navabar from "./Navbar";
// import Footer from "./Footer";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  password: string;
  confirm_password: string;
  gender: string;
  age: string;
}

const UserSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    password: "",
    confirm_password: "",
    gender: "",
    age: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // ✅ Removed the square brackets
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    console.log("Form Data", formData);
  };

  return (
    <>
    {/* <Navabar/> */}
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 content-center rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm dark:text-gray-600">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="first_name" className="block mb-1 text-sm">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="last_name" className="block mb-1 text-sm">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required
            />
          </div>

          <div>
            <label htmlFor="phone_no" className="block mb-1 text-sm">Phone Number</label>
            <input
              type="tel"
              name="phone_no"
              id="phone_no"
              placeholder="1234567890"
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="password" className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="confirm_password" className="block mb-1 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="*****"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="gender" className="block mb-1 text-sm">Gender</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="w-1/2">
              <label htmlFor="age" className="block mb-1 text-sm">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="25"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-black text-white">Sign Up</button>

          <p className="px-6 text-sm text-center dark:text-gray-600">
            Already have an account?
            <span
              className="hover:underline dark:text-violet-600 cursor-pointer ml-1"
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default UserSignup;
