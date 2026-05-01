import {
    HiOutlineHome,
    HiOutlineCube,
    HiOutlineCreditCard,
    HiOutlineTruck,
    HiOutlineUser,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineShieldCheck,
    HiOutlineClipboardList,
    HiOutlineChartBar,
    HiOutlineXCircle,
    HiCurrencyBangladeshi,
    HiOutlinePresentationChartBar
} from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
import { icon } from "leaflet";

export const sidebarConfig = [
    // 🌍 COMMON (all users)
    {
        label: "Home",
        path: "/",
        icon: HiOutlineHome,
        roles: ["user", "admin", "rider"]
    },
    {
        label: "My Parcels",
        path: "/dashboard/myParcels",
        icon: HiOutlineCube,
        roles: ["user", "admin", "rider"]
    },
    {
        label: "Payment History",
        path: "/dashboard/paymentHistory",
        icon: HiOutlineCreditCard,
        roles: ["user", "admin", "rider"]
    },
    {
        label: "Track",
        path: "/dashboard/track",
        icon: HiOutlineTruck,
        roles: ["user", "admin", "rider"]
    },
    //   {
    //     label: "Profile",
    //     path: "/dashboard/profile",
    //     icon: HiOutlineUser,
    //     roles: ["user", "admin", "rider"]
    //   },

    // 🛠 ADMIN ONLY
    {
        label: "Active Riders",
        path: "/dashboard/activeRiders",
        icon: HiOutlineUserGroup,
        roles: ["admin"]
    },
    {
        label: "Assign Rider",
        path: "/dashboard/assign-rider",
        icon: HiOutlineClipboardList,
        roles: ["admin"]
    },
    {
        label: "Pending Riders",
        path: "/dashboard/pendingRiders",
        icon: HiOutlineClock,
        roles: ["admin"]
    },
    {
        label: "Make Admin",
        path: "/dashboard/makeAdmin",
        icon: HiOutlineShieldCheck,
        roles: ["admin"]
    },
    {
        label: "Assigned Riders",
        path: "/dashboard/assignedRiders",
        icon: FaUserCheck,
        roles: ["admin"]
    },
    {
        label: "Analytics",
        path: "/dashboard/admin-analytics",
        icon: HiOutlineChartBar,
        roles: ["admin"]
    },

    // 🚚 RIDER ONLY
    {
        label: "Rider Panel",
        path: "/dashboard/rider-panel",
        icon: HiOutlineTruck,
        roles: ["rider"]
    },
    {
        label: "Rider Earnings",
        path: "/dashboard/rider-earnings",
        icon: HiOutlineCreditCard,
        roles: ["rider"]
    },
    {
        label: "Rider Dashboard",
        path: "/dashboard/rider-dashboard",
        icon: HiOutlineHome,
        roles: ["rider"]
    },
    {
        label: "Withdraw",
        path: "/dashboard/withdraw",
        icon: HiOutlineHome,
        roles: ["rider"]
    },
    {
        label: "Withdraw History",
        path: "/dashboard/withdraw-history",
        icon: HiOutlineHome,
        roles: ["rider"]
    },
    {
        label: "Withdraw Requests",
        path: "/dashboard/admin-withdraw",
        icon: HiCurrencyBangladeshi,
        roles: ["admin"]
    },
    {
        label: "Failed Parcels",
        path: "/dashboard/failed-parcels",
        icon: HiOutlineXCircle,
        roles: ["admin"]
    },
    {
        label: "Operations",
        path: "/dashboard/operations",
        icon: HiOutlinePresentationChartBar,
        roles: ["admin"]
    }
];