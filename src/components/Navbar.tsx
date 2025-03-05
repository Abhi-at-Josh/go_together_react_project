import { useState } from "react";
import RideRequests from "../pages/user/RideRequests";
import { useNavigate } from "react-router-dom";
const Navabar = () => {
    const navigate = useNavigate(); 
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <header className="bg-white shadow-2xl">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="block text-teal-600" href="#">
                         <span className="sr-only text-black">Home</span>
                            <svg style={{color:'black'}}
                            className="h-8 w-8" 
                            viewBox="0 0 64 64" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            >
                           
                            <path 
                                d="M16 44C13.79 44 12 45.79 12 48C12 50.21 13.79 52 16 52C18.21 52 20 50.21 20 48C20 45.79 18.21 44 16 44ZM48 44C45.79 44 44 45.79 44 48C44 50.21 45.79 52 48 52C50.21 52 52 50.21 52 48C52 45.79 50.21 44 48 44ZM16 20L20 12H44L48 20H56C58.21 20 60 21.79 60 24V40C60 41.1 59.1 42 58 42H56C56 38.69 53.31 36 50 36C46.69 36 44 38.69 44 42H20C20 38.69 17.31 36 14 36C10.69 36 8 38.69 8 42H6C4.9 42 4 41.1 4 40V24C4 21.79 5.79 20 8 20H16ZM12 32H52L48 24H16L12 32Z" 
                                fill="currentColor"
                            />
                            </svg>
                        </a>
                    </div>
                    <h1 className="text-balck mr-160 text-2xl font-bold "> Go-Together</h1>
                    <div className="md:flex md:items-center md:gap-12 ">
                        <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm" >
                            <li>
                            <a className="text-black transition hover:text-yellow-500" href="#"> About </a>
                            </li>

                            <li>
                            <a className="text-black transition hover:text-yellow-500"  href="#"> Rides </a>
                            </li>

                            <li>
                            <a className="text-black transition hover:text-yellow-500"  href="#"> Drive </a>
                            </li>
                            <button
                                className="relative px-4 py-2 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                Requests
                            </button>
                        </ul>
                        </nav>

                        <div className="hidden md:relative md:block">
                        <button
                            onClick={() => navigate("/profile")}
                            type="button"
                            className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                        >
                            <span className="sr-only">Toggle dashboard menu</span>

                            <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            className="size-10 object-cover"
                            />
                        </button>
                        </div>

                        <div className="block md:hidden">
                        <button
                            className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </header>
            {/* Ride Requests Dropdown */}
          <RideRequests menuOpen={menuOpen} />
        </>
    )
}
export default Navabar; 