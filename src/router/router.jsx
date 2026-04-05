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
import AboutUs from "../pages/AboutUs/AboutUs";
import PricingCalculator from "../components/PricingCalculator";
import TrackConsignment from "../components/TrackConsignment";
import ErrorPage from "../components/ErrorPage";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import VerifyCode from "../pages/Authentication/ForgotPassword/VerifyCode";
import ResetPassword from "../pages/Authentication/ForgotPassword/ResetPassword ";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/PAyment";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../components/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";

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
                loader: () => fetch('/coverageData.json')

            },
            {
                path: "sendParcel",
                loader: () => fetch("/coverageData.json"),
                element: (
                    <PrivateRoute>
                        <SendParcel />
                    </PrivateRoute>
                )
            },
            {
                path: "BeARider",
                element: <PrivateRoute><BeARider></BeARider></PrivateRoute>,
                loader: () => fetch("/coverageData.json")
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
            },
            {
                path: "/reset-password",
                Component: ResetPassword
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'track',
                Component: TrackParcel
            },
            {
                path: 'pendingRiders',
                Component: PendingRiders
            },
            {
                path: 'activeRiders',
                Component: ActiveRiders
            }
        ]
    }
]);
