import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authUser, clearState, userSelector } from "../../redux/userSlice"; // Adjust path as needed
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store"; // ✅ Import this instead of useDispatch

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
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      navigate('/user');
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessage, dispatch, navigate]);

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(authUser({ userData: data , isSignup: true }));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 content-center rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm dark:text-gray-600">Create your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="first_name" className="block mb-1 text-sm">First Name</label>
                <input
                  {...register("first_name", { required: "First Name is required" })}
                  type="text"
                  id="first_name"
                  placeholder="John"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
              </div>

              <div className="w-1/2">
                <label htmlFor="last_name" className="block mb-1 text-sm">Last Name</label>
                <input
                  {...register("last_name", { required: "Last Name is required" })}
                  type="text"
                  id="last_name"
                  placeholder="Doe"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm">Email Address</label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone_no" className="block mb-1 text-sm">Phone Number</label>
              <input
                {...register("phone_no", { required: "Phone number is required" })}
                type="tel"
                id="phone_no"
                placeholder="1234567890"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.phone_no && <p className="text-red-500 text-xs">{errors.phone_no.message}</p>}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="password" className="block mb-1 text-sm">Password</label>
                <input
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                  type="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              <div className="w-1/2">
                <label htmlFor="confirm_password" className="block mb-1 text-sm">Confirm Password</label>
                <input
                  {...register("confirm_password", { required: "Confirm Password is required" })}
                  type="password"
                  id="confirm_password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.confirm_password && <p className="text-red-500 text-xs">{errors.confirm_password.message}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="gender" className="block mb-1 text-sm">Gender</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  id="gender"
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
              </div>

              <div className="w-1/2">
                <label htmlFor="age" className="block mb-1 text-sm">Age</label>
                <input
                  {...register("age", { required: "Age is required" })}
                  type="number"
                  id="age"
                  placeholder="25"
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
              </div>
            </div>

            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-black text-white">
              {isFetching ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="px-6 text-sm text-center dark:text-gray-600">
              Already have an account?
              <span className="hover:underline dark:text-violet-600 cursor-pointer ml-1" onClick={() => navigate('/login')}>
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
