import { NavLink, Outlet } from "react-router";
import { sidebarConfig } from "../config/sidebarConfig";
import useUserRole from "../hooks/useUserRole";
import { HiOutlineMenu } from "react-icons/hi";
import DeveloperFooter from "../components/DeveloperFooter";

const DashboardLayout = () => {
    const { role, isLoading } = useUserRole();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open min-h-screen">

            {/* Drawer Toggle */}
            <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
            />

            {/* MAIN CONTENT */}
            <div className="drawer-content flex flex-col min-h-screen">

                {/* MOBILE TOPBAR */}
                <div className="w-full navbar bg-base-200 lg:hidden">
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-square btn-ghost"
                    >
                        <HiOutlineMenu className="text-xl" />
                    </label>

                    <h2 className="text-lg font-bold ml-2">
                        Dashboard
                    </h2>
                </div>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-4 lg:p-6">

                    <h1
                        className="
                            text-2xl
                            lg:text-4xl
                            text-center
                            p-3
                            lg:p-4
                            bg-amber-200
                            rounded-lg
                            mb-6
                        "
                    >
                        Dashboard
                    </h1>

                    <Outlet />

                </main>

                {/* FOOTER */}
                <DeveloperFooter />

            </div>

            {/* SIDEBAR */}
            <div className="drawer-side z-40">

                <label
                    htmlFor="dashboard-drawer"
                    className="drawer-overlay"
                ></label>

                <ul
                    className="
                        menu
                        bg-base-200
                        min-h-full
                        w-72
                        p-4
                        space-y-1
                    "
                >

                    {/* LOGO */}
                    <div className="mb-4 text-xl font-bold text-center">
                        🚚 SamShift
                    </div>

                    {/* SIDEBAR LINKS */}
                    {sidebarConfig
                        .filter(item => item.roles.includes(role))
                        .map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => {
                                            const drawer =
                                                document.getElementById(
                                                    "dashboard-drawer"
                                                );

                                            if (drawer) {
                                                drawer.checked = false;
                                            }
                                        }}
                                        className={({ isActive }) =>
                                            `
                                            flex
                                            items-center
                                            gap-3
                                            transition
                                            duration-200
                                            ${
                                                isActive
                                                    ? "bg-primary text-white"
                                                    : "hover:bg-base-300"
                                            }
                                            `
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