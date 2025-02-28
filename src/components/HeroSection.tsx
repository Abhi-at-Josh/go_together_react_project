import { Link } from "react-router-dom";
const HeroSection = () =>{
    return(<>
     <div className="relative h-[60vh] bg-cover bg-center text-center flex flex-col items-center justify-center p-6"
            style={{ background: "url('https://rapido-app-assets.storage.googleapis.com/66e1052cdca1e68cc52d070e8c9631aa_1736774712641.png')" }}>
            <h1 className="text-5xl font-bold drop-shadow-lg">Find or Offer a Ride with Go-Together</h1>
            <p className="mt-3 text-lg drop-shadow-md">Seamless intra-city car and bike pooling</p>
            <div className="mt-6">
              <Link to="login" className="px-6 py-3 bg-black text-white font-bold rounded-lg hover :bg-gray-800 mr-4">Login</Link>
              <Link to="signup" className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600">Sign Up</Link>
            </div>
          </div>
    </>)
}
export default HeroSection;