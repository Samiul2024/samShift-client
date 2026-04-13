import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // ✅ Debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    // ✅ Fetch users with TanStack Query
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users", debouncedSearch],
        queryFn: async () => {
            if (!debouncedSearch.trim()) return [];
            const res = await axiosSecure.get(
                `/users/search?query=${debouncedSearch}`
            );
            return res.data;
        },
        enabled: !!debouncedSearch,
        keepPreviousData: true,
        staleTime: 5000,
    });

    // ✅ Highlight function
    const highlightText = (text, keyword) => {
        if (!keyword) return text;

        const parts = text.split(new RegExp(`(${keyword})`, "gi"));

        return parts.map((part, i) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
                <span key={i} className="bg-yellow-200 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    // 👑 Make admin
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Make Admin?",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`).then(() => {
                    Swal.fire("Success!", "User is now admin", "success");

                    // ✅ Refetch automatically
                    queryClient.invalidateQueries(["users"]);
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
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/remove-admin/${id}`)
                    .then(() => {
                        Swal.fire("Removed!", "Admin removed", "success");

                        // ✅ Refetch automatically
                        queryClient.invalidateQueries(["users"]);
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
            </div>

            {/* ⏳ Loading */}
            {isLoading && <p className="text-blue-500">Searching...</p>}

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
                        {users.map((user) => (
                            <tr key={user._id}>
                                {/* ✨ Highlighted Email */}
                                <td>
                                    {highlightText(
                                        user.email,
                                        debouncedSearch
                                    )}
                                </td>

                                <td>
                                    <span
                                        className={`badge ${
                                            user.role === "admin"
                                                ? "badge-success"
                                                : "badge-ghost"
                                        }`}
                                    >
                                        {user.role || "user"}
                                    </span>
                                </td>

                                <td>
                                    {new Date(
                                        user.created_at
                                    ).toLocaleString()}
                                </td>

                                <td>
                                    {user.role === "admin" ? (
                                        <button
                                            onClick={() =>
                                                handleRemoveAdmin(user._id)
                                            }
                                            className="btn btn-sm btn-error"
                                        >
                                            Remove Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleMakeAdmin(user._id)
                                            }
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

            {/* ❗ Empty state */}
            {!isLoading && users.length === 0 && debouncedSearch && (
                <p className="text-gray-500 mt-4">
                    No users found for "{debouncedSearch}"
                </p>
            )}
        </div>
    );
};

export default MakeAdmin;