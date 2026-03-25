import React from 'react';
import { Link, NavLink } from 'react-router'; // make sure to import from 'react-router-dom'
import ProFastLogo from '../ProFastLogo/ProFastLogo';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user } = useAuth();
    // Function to apply active styles
    const activeClass = ({ isActive }) =>
        isActive ? 'rounded-3xl bg-[#CAEB66] font-bold' : 'text-gray-700';

    const navItems = (
        <>
            <li>
                <NavLink to="/" className={activeClass}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/sendParcel" className={activeClass}>
                    Send A Parcel
                </NavLink>
            </li>
            <li>
                <NavLink to="/coverage" className={activeClass}>
                    Coverage
                </NavLink>
            </li>

            {
                user && <>
                    <li>
                        <NavLink to="/dashboard" className={activeClass}>
                            DashBoard
                        </NavLink>
                    </li>
                </>
            }

            <li>
                <NavLink to="/about" className={activeClass}>
                    About Us
                </NavLink>
            </li>
            <li>
                <NavLink to="/PricingCalculator" className={activeClass}>
                    Pricing
                </NavLink>
            </li>
            <li>
                <NavLink to="/TrackConsignment" className={activeClass}>
                    Track Order
                </NavLink>
            </li>
            <li>
                <NavLink to="/bearider" className={activeClass}>
                    Be A Rider
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar sticky top-0 z-50  bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {navItems}
                    </ul>
                </div>

                <ProFastLogo />
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            <div className="navbar-end">
                <Link className="btn btn-primary" to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Navbar;