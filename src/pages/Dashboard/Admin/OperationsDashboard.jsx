import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis
} from "recharts";

const OperationsDashboard = () => {

    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["parcelOverview"],
        queryFn: async () => {

            const res = await axiosSecure.get(
                "/admin/parcel-overview"
            );

            return res.data;
        }
    });

    if (isLoading) {
        return <p className="p-6">Loading operations...</p>;
    }

    const {
        statuses = [],
        failedDistricts = [],
        failedRiders = [],
        failureReasons = []
    } = data;

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#EF4444",
        "#8B5CF6",
    ];

    return (

        <div className="p-6 space-y-8">

            <h2 className="text-3xl font-bold">
                🚚 Operations Dashboard
            </h2>

            {/* STATUS OVERVIEW */}

            <div className="grid md:grid-cols-2 gap-6">

                {/* PIE CHART */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="text-xl font-semibold mb-4">
                        Parcel Status Overview
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <PieChart>

                            <Pie
                                data={statuses}
                                dataKey="count"
                                nameKey="_id"
                                outerRadius={100}
                                label
                            >

                                {
                                    statuses.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* FAILURE REASONS */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="text-xl font-semibold mb-4">
                        Failure Reasons
                    </h3>

                    <div className="space-y-3">

                        {
                            failureReasons.map((item, index) => (

                                <div
                                    key={index}
                                    className="flex justify-between border-b pb-2"
                                >

                                    <span>{item._id}</span>

                                    <span className="font-bold">
                                        {item.total}
                                    </span>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

            {/* FAILED DISTRICTS */}

            <div className="bg-white p-6 rounded-xl shadow">

                <h3 className="text-xl font-semibold mb-4">
                    Failed Delivery Districts
                </h3>

                <ResponsiveContainer width="100%" height={300}>

                    <BarChart data={failedDistricts}>

                        <XAxis dataKey="_id" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="total" />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* FAILED RIDERS */}

            <div className="bg-white p-6 rounded-xl shadow">

                <h3 className="text-xl font-semibold mb-4">
                    Riders With Most Failed Deliveries
                </h3>

                <div className="overflow-x-auto">

                    <table className="table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Rider</th>
                                <th>Failed Deliveries</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                failedRiders.map((rider, index) => (

                                    <tr key={index}>

                                        <td>{index + 1}</td>

                                        <td>{rider._id}</td>

                                        <td>
                                            <span className="badge badge-error">
                                                {rider.total}
                                            </span>
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default OperationsDashboard;