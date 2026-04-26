import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RiderDashboard = () => {
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

  if (isLoading) return <p className="p-6">Loading dashboard...</p>;

  // 🔢 Calculations
  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalDeliveries = earnings.length;
  const pending = earnings.filter(e => e.status === "pending").length;
  const delivered = earnings.filter(e => e.status !== "pending").length;

  // 📊 Chart Data (group by date)
  const chartData = earnings.map(e => ({
    date: new Date(e.created_at).toLocaleDateString(),
    amount: e.amount,
  }));

  return (
    <div className="p-6 space-y-6">

      {/* 🔷 HEADER */}
      <h2 className="text-3xl font-bold">🚚 Rider Dashboard</h2>

      {/* 🟦 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Total Earnings</p>
          <h3 className="text-2xl font-bold text-green-600">
            ৳ {totalEarnings}
          </h3>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Total Deliveries</p>
          <h3 className="text-2xl font-bold">
            {totalDeliveries}
          </h3>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-500">
            {pending}
          </h3>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Completed</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {delivered}
          </h3>
        </div>

      </div>

      {/* 📈 CHART */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Earnings Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 RECENT TABLE */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Recent Earnings</h3>

        {earnings.length === 0 ? (
          <p>No data</p>
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
              {earnings.slice(0, 5).map(e => (
                <tr key={e._id}>
                  <td>{new Date(e.created_at).toLocaleDateString()}</td>
                  <td>{e.parcel_id?.toString()}</td>
                  <td>৳ {e.amount}</td>
                  <td>
                    <span className={`badge ${
                      e.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default RiderDashboard;