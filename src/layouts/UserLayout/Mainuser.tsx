import Footer from "../../components/Footer";
import Navabar from "../../components/Navbar";
import About from "../../pages/user/About";
import Card from "../../pages/user/Card";
import Find from "../../pages/user/Findride";


const MainUser = () =>{
    return(
        <><div style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#fff" }}><Navabar/></div>
        {/* <CreateRide/> */}
        <Find/>
        <Card/>
        <About/>
        <Footer/>
        </>
    )
}
export default MainUser;