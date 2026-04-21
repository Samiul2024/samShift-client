import { NavLink, Outlet } from "react-router";
import { sidebarConfig } from "../config/sidebarConfig";
import useUserRole from "../hooks/useUserRole";
import { HiOutlineMenu } from "react-icons/hi";

const DashboardLayout = () => {
    const { role, isLoading } = useUserRole();

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* 🔥 MAIN CONTENT */}
            <div className="drawer-content flex flex-col">

                {/* 🔥 TOP NAVBAR (MOBILE ONLY) */}
                <div className="w-full navbar bg-base-200 lg:hidden">
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-square btn-ghost"
                    >
                        <HiOutlineMenu className="text-xl" />
                    </label>
                    <h2 className="text-lg font-bold ml-2">Dashboard</h2>
                </div>

                {/* 🔥 PAGE CONTENT */}
                <div className="p-4 lg:p-6">
                    <h1 className="text-2xl lg:text-4xl text-center p-3 lg:p-4 bg-amber-200 rounded-lg mb-4">
                        Dashboard
                    </h1>

                    <Outlet />
                </div>
            </div>

            {/* 🔥 SIDEBAR */}
            <div className="drawer-side z-40">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 min-h-full w-72 p-4 space-y-1">

                    {/* 🔥 LOGO / TITLE */}
                    <div className="mb-4 text-xl font-bold text-center">
                        🚚 SamShift
                    </div>

                    {sidebarConfig
                        .filter(item => item.roles.includes(role))
                        .map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <li key={index}>
                                    <NavLink
                                        onClick={() => {
                                            document.getElementById("dashboard-drawer").checked = false;
                                        }}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 ${isActive ? "bg-primary text-white" : ""
                                            }`
                                        }
                                    >
                                        <Icon className="text-lg" />
                                        {item.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;