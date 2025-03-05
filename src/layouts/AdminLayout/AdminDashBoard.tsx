import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import { Asider } from "../../components/AdminAsider";
const AdminDashBoard = () =>{
    return(
        <>
        <div className=" bg-gray-100 ">
            <Asider/>
            <div className="p-4 sm:ml-64 bg-grey-500">
              <Outlet/>
            </div>
            <div className="ml-75">
            <Footer/>
            </div>
          </div>
        </>
    )
}
export default AdminDashBoard