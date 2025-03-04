import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { userSelector, authUser, clearState } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store"; // ✅ Import this instead of useDispatch

interface FormData {
  email: string;
  password: string;
}

const UserLogin = () => {
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
    const value = { userData: data, isSignup: false };
    dispatch(authUser(value)); // Login action
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 content-center rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
              </div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
          </div>

          {/* Error Message */}
          {isError && <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>}

          {/* Submit Button */}
          <div className="space-y-2">
            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-black text-white">
              {isFetching ? "Signing in..." : "Sign in"}
            </button>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account yet?
              <a onClick={() => navigate('/signup')} className="hover:underline dark:text-violet-600 cursor-pointer"> Sign up</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
