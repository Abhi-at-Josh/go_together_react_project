import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import Navabar from "./Navbar";
import axios,{ AxiosError } from "axios";

interface FormData {
    email:string;
    password:string;
}
const UserLogin = () => {
    const navigate = useNavigate();
    const [formData , setFormData]= useState<FormData>({
         email:"",
         password:"",
    });
    const [error , setError] = useState('');
    const [loading , setLoading]  = useState(false);

      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // ✅ Removed the square brackets
      };

      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
  
        try {
            const response = await axios.post("http://localhost:3000/users/login",formData);
            const { token } = response.data;

            localStorage.setItem("adminToken",token);
            navigate("/user");
        }
        catch(err) {
            const axiosError = err as AxiosError<{ message :string}>
            setError(axiosError.response?.data?.message || "Login failed. Please try agian .");
        }
        finally {
            setLoading(false)
        }
        console.log("Form Data ",formData)
      }
    return(
        <>
            {/* <Navabar/> */}
            <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col max-w-md p-6 content-center rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 shadow-2xl">
                <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
                </div>
                <form onSubmit={handleSubmit} action="" className="space-y-12">
                <div className="space-y-2">
                    <div>
                    <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="leroy@jenkins.com" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                    required
                    />
                    </div>
                    <div>
                    <div className="flex justify-between mb-2">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                    </div>
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
                </div>
                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                <div className="space-y-2">
                    <div>
                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-black text-white">Sign in</button>
                    </div>
                    <p className="px-6 text-sm text-center dark:text-gray-600">Don't have an account yet?
                    <a rel="noopener noreferrer" onClick={()=>{navigate('')}}  className="hover:underline dark:text-violet-600">Sign up</a>.
                    </p>
                </div>
                </form>
            </div>
            </div>

            {/* <Footer/> */}
        </>
    )
}
export default UserLogin;