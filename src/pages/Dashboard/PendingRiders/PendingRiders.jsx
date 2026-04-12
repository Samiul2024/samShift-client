import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);

    // 🔥 Load pending riders
    const { data: riders = [], refetch, isPending } = useQuery({
        queryKey: ["pendingRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    if (isPending) return <p>Loading...</p>;

    // ✅ Approve Rider
    const handleApprove = (id, email) => {
        Swal.fire({
            title: "Approve Rider?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Approve",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/${id}`, {
                    status: "approved",
                    email: email, // ✅ correct
                })
                    .then(() => {
                        Swal.fire("Approved!", "Rider is now active.", "success");
                        refetch();
                    });
            }
        });
    };

    // ❌ Reject Rider
    const handleReject = (id, email) => {
        Swal.fire({
            title: "Reject Application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/${id}`, {
                    status: "inactive",
                    email: email, // ✅ correct
                })
                    .then(() => {
                        Swal.fire("Rejected!", "Application rejected.", "success");
                        refetch();
                    });
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="relative group w-12 h-12">
                                        <img
                                            src={rider.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                            className="w-12 h-12 rounded-full object-cover cursor-pointer"
                                        />

                                        {/*  Hover Zoom */}
                                        <img
                                            src={rider.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                            className="absolute hidden group-hover:block w-32 h-32 rounded-lg object-cover -top-12 left-10 z-50 shadow-xl border"
                                        />
                                    </div>
                                </td>
                                <td><span className="text-2xl font-bold">{rider.name}</span></td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.phone}</td>

                                <td className="flex gap-2">
                                    {/* View */}
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => setSelectedRider(rider)}
                                    >
                                        View
                                    </button>

                                    {/* Approve */}
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleApprove(rider._id, rider.email)}
                                    >
                                        Approve
                                    </button>

                                    {/* Reject */}
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleReject(rider._id, rider.email)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {selectedRider && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">
                            Rider Details
                        </h3>

                        <div className="space-y-2 text-sm">
                            <p><b>Name:</b> {selectedRider.name}</p>
                            <p><b>Email:</b> {selectedRider.email}</p>
                            <p><b>Phone:</b> {selectedRider.phone}</p>
                            <p><b>Region:</b> {selectedRider.region}</p>
                            <p><b>District:</b> {selectedRider.district}</p>
                            <p><b>Service Area:</b> {selectedRider.serviceArea}</p>
                            <p><b>NID:</b> {selectedRider.nid}</p>
                            <p><b>License:</b> {selectedRider.license}</p>
                            <p><b>Bike:</b> {selectedRider.bike}</p>
                            <p><b>Bike Reg:</b> {selectedRider.bikeReg}</p>
                            <p>
                                <b>Applied At:</b>{" "}
                                {new Date(selectedRider.applied_at).toLocaleString()}
                            </p>
                            <p><b>About:</b> {selectedRider.about}</p>
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="btn"
                                onClick={() => setSelectedRider(null)}
                            >
                                Close
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    handleApprove(selectedRider._id, selectedRider.email);
                                    setSelectedRider(null);
                                }}
                            >
                                Approve
                            </button>

                            <button
                                className="btn btn-error"
                                onClick={() => {
                                    handleReject(selectedRider._id, selectedRider.email);
                                    setSelectedRider(null);
                                }}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;