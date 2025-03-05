import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { authAdmin , clearState, adminSelector} from "../../redux/adminslice/adminSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
interface FormData {
  email:string;
  password:string;
}
const AdminLogin = () => {
 const navigate = useNavigate();
 const dispatch = useAppDispatch();
 const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
 const adminState = useSelector(adminSelector) || {};
 const {isFetching = false, isSuccess = false, isError = false, errorMessage = "" } = adminState;
 useEffect(()=> {
  return () => {
    dispatch(clearState());
  };
 },[dispatch]);

 useEffect(() => {
  if(isSuccess) {
    dispatch(clearState());
    navigate('/adminpanel',{replace:true});
  }

  if(isError) {
    alert(errorMessage);
    dispatch(clearState());
  }
 },[isSuccess ,isError ,errorMessage, dispatch ,navigate]);

 const onSubmit = (data: FormData) => {
  dispatch(authAdmin({adminData: data , isSignup: false}));
 };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-2 text-gray-500">Sign in below to access your account</p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mt-6"> 
                <input
                 {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="relative mt-6">
                <input
                 {...register("password", { required: "Password is required" })}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  required
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              {isError && <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>}

              <div className="my-6">
                <button
                  type="submit"
                  disabled={isFetching}
                  className={`w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none ${
                    isFetching ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isFetching ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account yet?{' '}
                <a
                  href="#!"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign up
                </a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
