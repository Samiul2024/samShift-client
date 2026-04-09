import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    // 🔍 Search user
    const handleSearch = async () => {
        if (!search) return;

        const res = await axiosSecure.get(`/users/search?query=${search}`);
        setUsers(res.data);
    };

    // 👑 Make admin
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Make Admin?",
            icon: "question",
            showCancelButton: true,
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`)
                    .then(() => {
                        Swal.fire("Success!", "User is now admin", "success");
                        handleSearch();
                    });
            }
        });
    };

    // ❌ Remove admin
    const handleRemoveAdmin = (id) => {
        Swal.fire({
            title: "Remove Admin?",
            icon: "warning",
            showCancelButton: true,
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/remove-admin/${id}`)
                    .then(() => {
                        Swal.fire("Removed!", "Admin removed", "success");
                        handleSearch();
                    });
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Make Admin</h2>

            {/* 🔍 Search */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="input input-bordered w-full max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Search
                </button>
            </div>

            {/* 📊 Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === "admin" ? "badge-success" : "badge-ghost"}`}>
                                        {user.role || "user"}
                                    </span>
                                </td>
                                <td>
                                    {new Date(user.created_at).toLocaleString()}
                                </td>

                                <td>
                                    {user.role === "admin" ? (
                                        <button
                                            onClick={() => handleRemoveAdmin(user._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="btn btn-sm btn-success"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;