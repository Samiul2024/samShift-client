import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignedRiders = () => {

    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['assignedParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/assigned');
            return res.data;
        }
    });

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">
                Assigned Riders ({parcels.length})
            </h2>

            <div className="overflow-x-auto border">
                <table className="table w-full border border-collapse">
                    <thead className="bg-gray-400">
                        <tr className='text-black'>
                            <th className="border">#</th>
                            <th className="border">Parcel</th>
                            <th className="border">Sender</th>
                            <th className="border">Receiver</th>
                            <th className="border">Route</th>
                            <th className="border">Rider</th>
                            <th className="border">Cost</th>
                            <th className="border">Status</th>
                        </tr>
                    </thead>

                    <tbody className="bg-gray-100">
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">

                                <td className="border">{index + 1}</td>

                                <td className="border">
                                    <p className="font-semibold">{parcel.title}</p>
                                    <p className="text-xs">{parcel.tracking_id}</p>
                                </td>

                                <td className="border">
                                    {parcel.senderName}
                                </td>

                                <td className="border">
                                    {parcel.receiverName}
                                </td>

                                <td className="border text-sm">
                                    {parcel.senderDistrict} → {parcel.receiverDistrict}
                                </td>

                                <td className="border">
                                    <p className="font-semibold text-green-600">
                                        {parcel.assigned_rider_name || "N/A"}
                                    </p>
                                    <p className="text-xs">
                                        {parcel.assigned_rider_email}
                                    </p>
                                </td>

                                <td className="border font-bold">
                                    {parcel.delivery_cost} BDT
                                </td>

                                <td className="border">
                                    <span className="badge badge-info py-6">
                                        Rider Assigned
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {parcels.length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                        No assigned parcels 🚫
                    </p>
                )}
            </div>
        </div>
    );
};

export default AssignedRiders;