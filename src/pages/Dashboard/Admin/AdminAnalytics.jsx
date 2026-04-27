import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const AdminAnalytics = () => {
    const axiosSecure = useAxiosSecure();
    const [range, setRange] = useState("7d");

    const { data = {}, isLoading } = useQuery({
        queryKey: ["adminAnalytics", range],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/analytics?range=${range}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="p-6">Loading analytics...</p>;

    const {
        totalRevenue,
        totalParcels,
        deliveredParcels,
        successRate,
        dailyRevenue = [],
        topRiders = []
    } = data;

    // 📊 Chart Format
    const chartData = dailyRevenue.map(item => ({
        name: `${item._id.day}/${item._id.month}`,
        revenue: item.total
    }));

    return (
        <div className="p-6 space-y-6">

            {/* 🔷 HEADER + FILTER */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">📊 Admin Analytics</h2>

                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                </select>
            </div>

            {/* 🟦 STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Total Revenue</p>
                    <h3 className="text-2xl font-bold text-green-600">
                        ৳ {totalRevenue}
                    </h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Total Parcels</p>
                    <h3 className="text-2xl font-bold">
                        {totalParcels}
                    </h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Delivered</p>
                    <h3 className="text-2xl font-bold text-blue-600">
                        {deliveredParcels}
                    </h3>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                    <p>Success Rate</p>
                    <h3 className="text-2xl font-bold text-purple-600">
                        {successRate}%
                    </h3>
                </div>

            </div>

            {/* 📈 CHART */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                    Revenue Trend
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

            {/* 🏆 TOP RIDERS */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">
                    🏆 Top Riders
                </h3>

                {topRiders.length === 0 ? (
                    <p>No data</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Rider Email</th>
                                <th>Deliveries</th>
                                <th>Total Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topRiders.map((r, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{r._id}</td>
                                    <td>{r.totalDeliveries}</td>
                                    <td className="text-green-600 font-bold">
                                        ৳ {r.totalEarned}
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

export default AdminAnalytics;