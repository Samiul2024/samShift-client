import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const RiderEarnings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: earnings = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["earnings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/earnings");
            return res.data;
        },
    });

    //  Loading State
    if (isLoading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Loading earnings...</p>
            </div>
        );
    }
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">💰 Rider Earnings</h2>

            {/* 🚫 Empty State */}
            {earnings.length === 0 ? (
                <p className="text-gray-500">No earnings yet 🚫</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Parcel</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {earnings.map((e, i) => (
                                <tr key={e._id}>
                                    <td>{i + 1}</td>

                                    <td>
                                        {new Date(e.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="truncate max-w-[120px]">
                                        {e.parcel_id}
                                    </td>

                                    <td className="font-semibold text-green-600">
                                        ৳ {e.amount}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge ${e.status === "pending"
                                                ? "badge-warning"
                                                : "badge-success"
                                                }`}
                                        >
                                            {e.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RiderEarnings;