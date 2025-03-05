import { useNavigate } from "react-router-dom";
const LandingPageNav = () => {
    const navigate = useNavigate();
    const scrollToSection = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return(<>
      <nav className="bg-black-500 text-black py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">Go-Together</h1>
          <div>
            <button onClick={() => scrollToSection('about')} className="mr-4 font-semibold hover:underline">About</button>
            {/* <button onClick={() => scrollToSection('services')} className="mr-4 font-semibold hover:underline">Services</button> */}
            <button onClick={() => scrollToSection('ride-options')} className="mr-4 font-semibold hover:underline">Ride</button>
            <button onClick={() => navigate('login')} className="mr-4 font-semibold hover:underline">Login</button>
            <button onClick={() => navigate('signup')} className="font-semibold hover:underline">Sign Up</button>
          </div>
        </div>
      </nav>
    </>)
}
export default LandingPageNav