import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    // 🔥 Fetch active riders
    const { data: riders = [], refetch, isPending } = useQuery({
        queryKey: ["activeRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        },
    });

    // 🔍 Search filter
    const filteredRiders = riders.filter((rider) =>
        rider.name?.toLowerCase().includes(search.toLowerCase())
    );

    // ❌ Deactivate rider
    const handleDeactivate = (id) => {
        Swal.fire({
            title: "Deactivate Rider?",
            text: "This rider will no longer be active.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Deactivate",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/${id}`, { status: "inactive" })
                    .then(() => {
                        Swal.fire("Deactivated!", "Rider is now inactive.", "success");
                        refetch();
                    });
            }
        });
    };

    if (isPending) return <p>Loading...</p>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

            {/* 🔍 Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="input input-bordered w-full max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 📊 Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRiders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td className="text-xs">{rider.email}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.phone}</td>

                                <td>
                                    <span className="badge badge-success">
                                        {rider.status}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDeactivate(rider._id)}
                                    >
                                        Deactivate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ❗ No Data */}
            {filteredRiders.length === 0 && (
                <p className="text-center mt-4 text-gray-500">
                    No riders found.
                </p>
            )}
        </div>
    );
};

export default ActiveRiders;