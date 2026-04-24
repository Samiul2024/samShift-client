import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const RiderEarnings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: earnings = [], isLoading } = useQuery({
        queryKey: ["earnings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/earnings");
            return res.data;
        },
    });

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">💰 Earnings</h2>

            {earnings.length === 0 ? (
                <p>No earnings yet 🚫</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Parcel</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {earnings.map(e => (
                            <tr key={e._id}>
                                <td>{new Date(e.created_at).toLocaleDateString()}</td>
                                <td>{e.parcel_id}</td>
                                <td>৳ {e.amount}</td>
                                <td>{e.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RiderEarnings;