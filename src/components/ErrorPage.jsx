import { Link } from "react-router";
import errorImg from "../assets/404.jpg"; // or your image path

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="text-center space-y-6">

                {/* Image */}
                <img
                    src={errorImg}
                    alt="404 Error"
                    className="w-72 mx-auto"
                />

                {/* Title */}
                <h1 className="text-5xl font-bold text-gray-800">
                    Error 404
                </h1>

                {/* Description */}
                <p className="text-gray-500">
                    Oops! The page you are looking for does not exist.
                </p>

                {/* Button */}
                <Link to="/">
                    <button className="btn btn-success px-8 text-white">
                        Go Home
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default ErrorPage;