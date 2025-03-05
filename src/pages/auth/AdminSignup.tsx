import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authAdmin, clearState, adminSelector } from "../../redux/adminslice/adminSlice";
import { useSelector } from "react-redux";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cpassword: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Ensure safe usage of selector
  const adminState = useSelector(adminSelector) || {}; 
  const { isFetching = false, isSuccess = false, isError = false, errorMessage = "" } = adminState;

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      navigate('/adminpanel',{replace:true});
    }

    if (isError) {
      alert(errorMessage); 
      dispatch(clearState());
    }
  }, [isSuccess, isError, errorMessage, dispatch, navigate]);
  const onSubmit = (data: FormData) => {
    if (data.password !== data.cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(authAdmin({ adminData: data, isSignup: true }));
  };

  return (
    <div className="border border-gray-200 mt-15 ml-10 mr-10 text-sm rounded-lg shadow-md bg-white">
      <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6 drop-shadow-md ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Create Account</h1>
          <p className="text-sm dark:text-gray-600">Create your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm mb-2 block">First Name</label>
              <input
                {...register("first_name", { required: "First name is required" })}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter first name"
              />
              {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-2 block">Last Name</label>
              <input
                {...register("last_name", { required: "Last name is required" })}
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter last name"
              />
              {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-600 text-sm mb-2 block">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-2 block">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-2 block">Confirm Password</label>
              <input
                {...register("cpassword", { required: "Confirm password is required" })}
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Confirm password"
              />
              {errors.cpassword && <p className="text-red-500 text-xs">{errors.cpassword.message}</p>}
            </div>
          </div>

          {isError && <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>}
          {isSuccess && <p className="text-green-500 text-sm mt-4 text-center">Account created successfully!</p>}

          <div className="mt-8 flex justify-center gap-4">
            <button
              type="submit"
              disabled={isFetching}
              className={`py-3 px-6 text-sm tracking-wider rounded text-white bg-black hover:bg-blue-700 focus:outline-none ${
                isFetching ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isFetching ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
