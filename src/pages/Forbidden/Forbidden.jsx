import { Link } from "react-router";
import { HiOutlineShieldExclamation, HiOutlineArrowLeft } from "react-icons/hi";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="max-w-xl w-full text-center bg-white shadow-xl rounded-2xl p-10">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 p-5 rounded-full">
                        <HiOutlineShieldExclamation className="text-red-500 text-6xl" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold text-red-500 mb-2">403</h1>

                <h2 className="text-2xl font-semibold mb-4">
                    Access Forbidden 🚫
                </h2>

                {/* Description */}
                <p className="text-gray-500 mb-6">
                    You don’t have permission to access this page.
                    Please contact admin if you believe this is a mistake.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/" className="btn btn-primary text-black flex items-center gap-2">
                        <HiOutlineArrowLeft />
                        Go Home
                    </Link>

                    <Link to="/dashboard" className="btn btn-outline">
                        Dashboard
                    </Link>
                </div>

                {/* Footer Note */}
                <p className="text-xs text-gray-400 mt-8">
                    SamShift Parcel Delivery System
                </p>
            </div>
        </div>
    );
};

export default Forbidden;