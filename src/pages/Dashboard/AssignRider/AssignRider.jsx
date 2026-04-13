import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRider = () => {

    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['assignableParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/assignable');
            return res.data;
        }
    });

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Assign Rider</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Route</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">

                                <td>{index + 1}</td>

                                <td className="text-xs break-all">
                                    {parcel._id}
                                </td>

                                <td>
                                    {parcel.senderName}
                                </td>

                                <td>
                                    {parcel.receiverName}
                                </td>

                                <td className="text-sm">
                                    {parcel.senderDistrict} → {parcel.receiverDistrict}
                                </td>

                                <td className="font-semibold text-green-600">
                                    {parcel.delivery_cost} BDT
                                </td>

                                <td>
                                    {new Date(parcel.creation_date).toLocaleDateString()}
                                </td>

                                <td>
                                    <span className="badge badge-warning">
                                        Not Collected
                                    </span>
                                </td>

                                <td>
                                    <button className="btn btn-sm btn-primary text-black">
                                        Assign Rider
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {parcels.length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                        No parcels available for assignment 🚫
                    </p>
                )}
            </div>
        </div>
    );
};

export default AssignRider;