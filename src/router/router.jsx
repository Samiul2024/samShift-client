import {
    createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import RiderApplication from "../components/RiderApplication";
import AboutUs from "../pages/AboutUs/AboutUs";
import PricingCalculator from "../components/PricingCalculator";
import TrackConsignment from "../components/TrackConsignment";
import ErrorPage from "../components/ErrorPage";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import VerifyCode from "../pages/Authentication/ForgotPassword/VerifyCode";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/districts.json')

            },
            {
                path: "sendParcel",
                loader: () => fetch("/districts.json"),
                element: (
                    <PrivateRoute>
                        <SendParcel />
                    </PrivateRoute>
                )
            },
            {
                path: "BeARider",
                Component: RiderApplication
            },
            {
                path: "About",
                Component: AboutUs
            },
            {
                path: "PricingCalculator",
                Component: PricingCalculator
            },
            {
                path: "TrackConsignment",
                Component: TrackConsignment
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'forgot-password',
                Component: ForgotPassword
            },
            {
                path: '/verify-code',
                Component: VerifyCode
            }
        ]
    }
]);
