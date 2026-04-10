import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProFastLogo from '../pages/shared/ProFastLogo/ProFastLogo';
import {
    HiOutlineHome,
    HiOutlineCube,
    HiOutlineCreditCard,
    HiOutlineTruck,
    HiOutlineUser,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineShieldCheck
} from "react-icons/hi";
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {

    const { role, isLoading } = useUserRole();
    console.log(role);

    return (

        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <ProFastLogo></ProFastLogo>
                    <li>
                        <NavLink to="/" className="flex items-center gap-2">
                            <HiOutlineHome className="text-lg" />
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/myParcels" className="flex items-center gap-2">
                            <HiOutlineCube className="text-lg" />
                            My Parcels
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-2">
                            <HiOutlineCreditCard className="text-lg" />
                            Payment History
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/track" className="flex items-center gap-2">
                            <HiOutlineTruck className="text-lg" />
                            Track a Package
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/dashboard/profile" className="flex items-center gap-2">
                            <HiOutlineUser className="text-lg" />
                            Update Profile
                        </NavLink>
                    </li>

                    {/* Riders link */}
                    {!isLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/activeRiders" className="flex items-center gap-2">
                                    <HiOutlineUserGroup className="text-lg" />
                                    Active Riders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/pendingRiders" className="flex items-center gap-2">
                                    <HiOutlineClock className="text-lg" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            {/* admin links */}
                            <li>
                                <NavLink to="/dashboard/makeAdmin" className="flex items-center gap-2">
                                    <HiOutlineShieldCheck className="text-lg" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div >
    );
};

export default DashboardLayout;