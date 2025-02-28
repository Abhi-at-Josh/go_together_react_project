import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";    
const Footer = () =>{
    return(
        <>
               <footer className="bg-White text-black text-center py-6 mt-12">
                    <p>&copy; 2025 Go-Together. All rights reserved.</p>
                    <div className="mt-2">
                      <Link to="/terms" className="mr-4 hover:underline">Terms & Conditions</Link>
                      <Link to="/privacy" className="mr-4 hover:underline">Privacy Policy</Link>
                      <Link to="/contact" className="hover:underline">Contact Us</Link>
                    </div>
                    <div className="mt-4">
                      <p>Follow us on:</p>
                      <div className="flex justify-center gap-4 mt-2">
                        <a href="#" className="hover:underline flex items-center gap-2"><FaFacebook /> Facebook</a>
                        <a href="#" className="hover:underline flex items-center gap-2"><FaTwitter /> Twitter</a>
                        <a href="#" className="hover:underline flex items-center gap-2"><FaInstagram /> Instagram</a>
                      </div>
                    </div>
                  </footer>
        </>
    )
}
export default Footer;  