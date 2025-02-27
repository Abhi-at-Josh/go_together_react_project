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

const router = createBrowserRouter([
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
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
