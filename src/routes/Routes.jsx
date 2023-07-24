import Login from '../Pages/Shared/Login';
import SignUP from '../Pages/Shared/SignUp';
import MainLayout from '../Layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom';
import ErrorElement from '../Pages/ErrorElement'
import Home from '../Pages/Home/Home';
import Terms from '../Pages/Shared/Terms';
import Colleges from '../Pages/Colleges';
import Admission from '../Pages/Admission/Admission';
import MyCollege from '../Pages/myCollegeInfo/MyCollege';
import CollegeCardDetails from '../Pages/Home/CollegeCard/CollegeCardDetails';
import PrivateRoute from './PrivateRoute';
import AdmissionForm from '../Pages/Admission/AdmissionForm';
import CollegeEdit from '../Pages/myCollegeInfo/CollegeEdit';
import Profile from '../Pages/Profile';

const router = createBrowserRouter(
[
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: "/details/:id",
        element: <PrivateRoute><CollegeCardDetails></CollegeCardDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/universities/${params.id}`),
      },
      {
        path: '/college',
        element: <Colleges></Colleges>
      },
      {
        path: '/admission',
        element: <Admission></Admission>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/universities`),
      },
      {
        path: "/admissionDetails/:id",
        element: <AdmissionForm></AdmissionForm>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/universities/${params.id}`),
      },
      {
        path: '/myCollege',
        element: <MyCollege></MyCollege>
      },
      {
        path: '/editInfo/:id',
        element: <CollegeEdit></CollegeEdit>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/postedAdmissionInfo/${params.id}`),
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: `/profile/:email`,
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'signup',
        element: <SignUP></SignUP>
      },
      {
        path: '/Signup/terms',
        element: <Terms></Terms>
      }
      
    ]
  }
  ])

export default router;
