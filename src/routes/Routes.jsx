import Login from '../Pages/Shared/Login';
import SignUP from '../Pages/Shared/SignUp';
import MainLayout from '../Layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom';
import ErrorElement from '../Pages/ErrorElement'
import Home from '../Pages/Home/Home';
import Terms from '../Pages/Shared/Terms';
import Colleges from '../Pages/Colleges';
import Admission from '../Pages/Admission/Admission';
import MyCollege from '../Pages/myCollege';
import CollegeCardDetails from '../Pages/Home/CollegeCard/CollegeCardDetails';
import PrivateRoute from './PrivateRoute';
// import

const router = createBrowserRouter([
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
        path: '/myCollege',
        element: <MyCollege></MyCollege>
      },
      {
        path: 'login',
        element: <Login></Login>
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
