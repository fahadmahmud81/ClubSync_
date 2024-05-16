import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Clubs from "../Pages/Clubs/Clubs";
import Achievements from "../Pages/Achievements/Achievements";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Login from "../Pages/LoginRegister/Login";
import Register from "../Pages/LoginRegister/Register";
import LoadingElement from "../Components/LoadingElement";
import NewsEvents from "../Pages/NewsEvents/NewsEvents";
import NoAccess from "../Components/NoAccess";
import StudentPanel from "../StudentPanel/StudentPanel";
import PrivateRoutes from "./PrivateRoutes";
import PrivateStudent from "./PrivateStudent";
import SuccessfulPayment from "../Payment/SuccessfulPayment";
import FailPayment from "../Payment/FailPayment";
import Certificate from "../StudentPanel/Certificate/Certificate";
import CertificatePdf from "../StudentPanel/Certificate/CertificatePdf";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/clubs',
                element: <Clubs></Clubs>
            },
            {
                path: '/news_events',
                element: <NewsEvents></NewsEvents>
            },
            {
                path: '/achievements',
                element: <Achievements></Achievements>
            },
            {
                path: '/contact_us',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/loader',
                element: <LoadingElement></LoadingElement>
            },
            {
                path: '/noAccess',
                element: <NoAccess></NoAccess>
            },
            // student panel
            {
                path: '/student_panel',
                element: <PrivateRoutes>
                    <PrivateStudent>
                        <StudentPanel></StudentPanel>
                    </PrivateStudent>
                </PrivateRoutes>
            },
            {
                path: '/success_payment',
                element: <PrivateRoutes><PrivateStudent><SuccessfulPayment></SuccessfulPayment></PrivateStudent></PrivateRoutes>
            },
            {
                path: '/fail_payment',
                element: <PrivateRoutes><PrivateStudent><FailPayment></FailPayment></PrivateStudent></PrivateRoutes>
            },
            {
                path: '/certificatePdf/:id',
                loader: ({ params }) => {
                    return fetch(`http://localhost:5000/eventInfoById/${params.id}`,
                        {
                            method: "GET",
                            headers: {
                                authorization: `bearer ${localStorage.getItem('accessToken')}`
                            }
                        })
                },
                element: <PrivateRoutes><PrivateStudent><CertificatePdf></CertificatePdf></PrivateStudent></PrivateRoutes>
            },


        ]
    }
])