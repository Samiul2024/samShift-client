import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

const TrackConsignment = () => {

    // tracking code state
    const [trackingCode, setTrackingCode] = useState("");

    // fake tracking updates (you can replace with API data later)
    const trackingUpdates = [
        {
            date: "Mar 14, 2026",
            time: "09:15 am",
            status: "Parcel information received."
        },
        {
            date: "Mar 14, 2026",
            time: "11:40 am",
            status: "Parcel picked up from sender."
        },
        {
            date: "Mar 14, 2026",
            time: "05:20 pm",
            status: "Arrived at sorting hub."
        },
        {
            date: "Mar 15, 2026",
            time: "08:10 am",
            status: "Assigned to delivery rider."
        },
        {
            date: "Mar 15, 2026",
            time: "11:30 am",
            status: "Out for delivery."
        },
        {
            date: "Mar 15, 2026",
            time: "02:05 pm",
            status: "Delivered successfully."
        }
    ];

    const handleSearch = () => {
        console.log("Tracking Code:", trackingCode);
    };
    const productDetails = {
        createdAt: "Mar 14, 2026 09:10 am",
        id: "148976175",
        invoice: "INV-24227",
        trackingCode: "TRKBD9823Q7H5H55YV7",

        name: "Zahid Hossain",
        address: "Madrasha Road, Chandpur Sadar, Chandpur, 3600, Bangladesh",
        phone: "01780448866",

        approved: "Yes",
        weight: "2.5 KG",
        cod: "৳ 450",

        status: "In Transit"
    };
    return (
        <section className="bg-base-200 rounded-3xl p-12 my-20">

            {/* Heading */}
            <div className="mb-6">
                <h2 className="text-4xl font-bold text-primary mb-2">
                    Track Your Consignment
                </h2>

                <p className="text-gray-500">
                    Now you can easily track your consignment
                </p>
            </div>

            {/* Search Box */}
            <div className="flex items-center gap-4 max-w-xl mb-8">

                <div className="flex items-center bg-base-100 border rounded-full px-4 py-2 flex-1">

                    <FiSearch className="text-gray-400 mr-2" />

                    <input
                        type="text"
                        placeholder="Search tracking code here"
                        className="outline-none w-full bg-transparent"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                    />

                </div>

                <button
                    onClick={handleSearch}
                    className="btn btn-success rounded-full px-8"
                >
                    Search
                </button>

            </div>

            <div className="divider"></div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-10">

                {/* Product Details */}
                <div className="bg-base-100 rounded-3xl p-8 shadow">

                    <h3 className="text-2xl font-bold text-primary mb-4">
                        Product details
                    </h3>

                    <p className="mb-2">{productDetails.createdAt}</p>

                    <p><strong>Id :</strong> {productDetails.id}</p>
                    <p><strong>Invoice :</strong> {productDetails.invoice}</p>
                    <p className="mb-4">
                        <strong>Tracking Code :</strong> {productDetails.trackingCode}
                    </p>

                    <p><strong>Name :</strong> {productDetails.name}</p>

                    <p className="mb-2">
                        <strong>Address :</strong> {productDetails.address}
                    </p>

                    <p className="mb-4">
                        <strong>Phone Number :</strong> {productDetails.phone}
                    </p>

                    <p><strong>Approved :</strong> {productDetails.approved}</p>
                    <p><strong>Weight :</strong> {productDetails.weight}</p>
                    <p><strong>COD :</strong> {productDetails.cod}</p>

                    <p className="text-warning font-semibold mt-2">
                        {productDetails.status}
                    </p>

                </div>


                {/* Tracking Updates */}
                <div className="bg-base-100 rounded-3xl p-8 shadow">

                    <h3 className="text-2xl font-bold text-primary mb-6">
                        Tracking Updates
                    </h3>

                    <div className="space-y-8">

                        {trackingUpdates.map((item, index) => (
                            <div key={index} className="flex items-center gap-6">

                                {/* date */}
                                <div className="text-sm text-gray-500 w-28">
                                    <p>{item.date}</p>
                                    <p>{item.time}</p>
                                </div>

                                {/* timeline icon */}
                                <div className="flex flex-col items-center">

                                    <div className="w-10 h-10 bg-success/20 text-success rounded-full flex items-center justify-center">
                                        <FaCheck />
                                    </div>

                                    {index !== trackingUpdates.length - 1 && (
                                        <div className="w-[2px] h-12 bg-gray-300"></div>
                                    )}

                                </div>

                                {/* status */}
                                <p className="text-gray-600">{item.status}</p>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
};

export default TrackConsignment;