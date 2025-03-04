import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './layouts/UserLayout/LandingPage';
import MainUser from './layouts/UserLayout/Mainuser';
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignup';
import PageNotFound from './components/PageNotFound';
import RideFound from './pages/user/RideFound';
import RideFoundResult from './pages/user/RideFoundResult';
import AdminDashBoard from './layouts/AdminLayout/AdminDashBoard';
import UserView from './pages/admin/Userview';
import RideRequestView from './pages/admin/RideRequestView';
import Signup from './pages/auth/AdminSignup';
import AdminHeroSection from './components/AdminHeroSectionPage';
import AdminView from './pages/admin/AdminView';
import RideView from './pages/admin/RideView';
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
  {
    path:"/adminpanel",
    element:<AdminDashBoard/>,
    children: [
      {
       path:"adminherosection",
       element: <AdminHeroSection/>
      },
      {
        path :"users",
        element:<UserView/>
      },
      {
        path :"riderequest",
        element:<RideRequestView/>
      },
      {
        path :"createaccount",
        element:<Signup/>
      },
      {
        path:"admins",
        element:<AdminView/>
      },
      {
        path:"rides",
        element:<RideView/>
      }
      
    ]
  },


  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path:"user",
    element:<MainUser/>
  },
  {
    path:"login",
    element:<UserLogin/>
  },
  {
    path:"signup",
    element:<UserSignup/>
  },
  {
    path:"ridefound",
    element:<RideFound/>
  },
  {
    path:"*",
    element:<PageNotFound/>
  },
  {
   path:"ridefoundlist",
   element:<RideFoundResult/>
  },
])
function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
