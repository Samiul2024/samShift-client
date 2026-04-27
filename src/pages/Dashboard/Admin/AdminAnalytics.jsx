import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const AdminAnalytics = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["adminAnalytics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/analytics");
            return res.data;
        },
    });

    if (isLoading) return <p className="p-6">Loading analytics...</p>;

    const {
        totalRevenue,
        totalParcels,
        deliveredParcels,
        successRate,
        monthlyRevenue = []
    } = data;

    // 📊 Format chart data
    const chartData = monthlyRevenue.map(item => ({
        name: `${item._id.month}/${item._id.year}`,
        revenue: item.total
    }));

    return (
        <div className="p-6 space-y-6">

            {/* 🔷 HEADER */}
            <h2 className="text-3xl font-bold">📊 Admin Analytics</h2>

            {/* 🟦 STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-green-600">
                        ৳ {totalRevenue}
                    </h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Total Parcels</p>
                    <h3 className="text-2xl font-bold">
                        {totalParcels}
                    </h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Delivered</p>
                    <h3 className="text-2xl font-bold text-blue-600">
                        {deliveredParcels}
                    </h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-gray-500">Success Rate</p>
                    <h3 className="text-2xl font-bold text-purple-600">
                        {successRate}%
                    </h3>
                </div>

            </div>

            {/* 📈 CHART */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                    Monthly Revenue
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default AdminAnalytics;