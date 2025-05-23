import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";

import Home from "../component/Home/Home";
import Course from "../Pages/Course";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import SessionDetails from "../component/Popular/SessionDetails";
import ViewAllMaterial from "../Dashboard/Owner/ViewAllMaterial";
import BookedSession from "../Dashboard/Student/BookedSession";
import CreateNote from "../Dashboard/Student/CreateNote";
import PersonalNote from "../Dashboard/Student/PersonalNote";
import ViewMaterial from "../Dashboard/Student/ViewMaterial";
import UpdateNote from "../Dashboard/Student/UpdateNote";
import CreateStudySession from "../Dashboard/Tutor/CreateStudySession";
import StudyMaterials from "../Dashboard/Tutor/StudyMaterials";
import UpdateMaterials from "../Dashboard/Tutor/UploadMaterials";
import UploadMaterials from "../Dashboard/Tutor/UploadMaterials";
import ViewAllCreateSession from "../Dashboard/Tutor/ViewAllCreateSession";
import ViewAllStudents from "../Dashboard/Owner/ViewAllStudents";
import ViewAllStudySession from "../Dashboard/Owner/ViewAllStudySession";
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
        path:'/sessionDetails/:id',
        element:<SessionDetails></SessionDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/courseDetails/${params.id}`),
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
      //  {
      //   path:'viewMaterials',
      //   element:<ViewAllMaterial></ViewAllMaterial>
      // },
      {
        path:'viewBooked',
        element:<BookedSession></BookedSession>
      },
      {
        path:'createNote',
        element:<CreateNote></CreateNote>
      },
      {
        path:'manageNotes',
        element:<PersonalNote></PersonalNote>
      },
      {
        path:'viewMaterials',
        element:<ViewMaterial></ViewMaterial>
      },
      {
        path:'updateNote/:id',
        element:<UpdateNote></UpdateNote>
      },
      {
        path:'createSession',
        element:<CreateStudySession></CreateStudySession>
      },
      {
        path:'viewSessions',
        element:<ViewAllCreateSession></ViewAllCreateSession>
      },
      {
        path:'uploadMaterials',
        element:<UploadMaterials></UploadMaterials>
      },
      {
        path:'studyMaterials',
        element:<StudyMaterials></StudyMaterials>
      },
      {
        path:'updateMaterials/:id',
        element:<UpdateMaterials></UpdateMaterials>
      },
      {
        path:'allUsers',
        element:<ViewAllStudents></ViewAllStudents>
      },
      {
        path:'allStudySession',
        element:<ViewAllStudySession></ViewAllStudySession>
      },
      {
        path:'allMaterials',
        element:<ViewAllMaterial></ViewAllMaterial>
      }

    ]
  }
]);
export default router;
