import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";

import Home from "../component/Home/Home";
import Course from "../Pages/Course";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/course',
        element:<Course></Course>
      },
      {
        path:'/about',
        element:<About></About>
      },
      {
        path:'/contact',
        element:<Contact></Contact>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ],
    
  },
  {
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {

      }
    ]
  }
]);
export default router;
