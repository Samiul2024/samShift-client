import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRider = () => {

    const axiosSecure = useAxiosSecure();

    const [selectedParcel, setSelectedParcel] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // 🔥 Load assignable parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['assignableParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/assignable');
            return res.data;
        }
    });

    // 🔥 Load riders based on selected parcel district
    const { data: riders = [] } = useQuery({
        queryKey: ['ridersByDistrict', selectedParcel?.senderDistrict],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders/by-district?district=${selectedParcel.senderDistrict}`
            );
            return res.data;
        }
    });

    const handleOpenModal = (parcel) => {
        setSelectedParcel(parcel);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedParcel(null);
        setShowModal(false);
    };

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Assign Rider</h2>

            <div className="overflow-x-auto border">
                <table className="table w-full border border-collapse">
                    <thead className="bg-gray-400">
                        <tr className='text-black'>
                            <th className="border">Sl</th>
                            <th className="border">Parcel ID</th>
                            <th className="border">Parcel Title</th>
                            <th className="border">Parcel type</th>
                            <th className="border">Sender</th>
                            <th className="border">Receiver</th>
                            <th className="border">Route</th>
                            <th className="border">Cost</th>
                            <th className="border">Date</th>
                            <th className="border">D. Status</th>
                            <th className="border">Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-gray-100">
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">

                                <td className="border">{index + 1}</td>

                                <td className="text-xs break-all border">
                                    {parcel._id}
                                </td>

                                <td className='font-semibold border'>
                                    {parcel.title}
                                </td>

                                <td className="border">
                                    {parcel.type}
                                </td>

                                <td className="border">
                                    {parcel.senderName}
                                </td>

                                <td className="border">
                                    {parcel.receiverName}
                                </td>

                                <td className="text-sm border">
                                    {parcel.senderDistrict} → {parcel.receiverDistrict}
                                </td>

                                <td className="font-bold text-green-600 border">
                                    {parcel.delivery_cost} <span className='font-normal text-black'>BDT</span>
                                </td>

                                <td className="border">
                                    {new Date(parcel.creation_date).toLocaleDateString()}
                                </td>

                                <td className="border">
                                    <span className="badge py-6 badge-warning">
                                        Not Collected
                                    </span>
                                </td>

                                <td className="border">
                                    <button
                                        onClick={() => handleOpenModal(parcel)}
                                        className="btn btn-sm py-6 btn-primary text-black"
                                    >
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

            {/* 🔥 MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[600px]">

                        <h3 className="text-xl font-bold mb-4">
                            Assign Rider ({selectedParcel?.senderDistrict})
                        </h3>

                        {riders.length === 0 ? (
                            <p>No riders available in this district 🚫</p>
                        ) : (
                            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                                {riders.map(rider => (
                                    <div
                                        key={rider._id}
                                        className="flex justify-between items-center border p-3 rounded"
                                    >
                                        <div>
                                            <p className="font-semibold">{rider.name}</p>
                                            <p className="text-sm">{rider.email}</p>
                                        </div>

                                        <button className="btn btn-sm btn-success text-black">
                                            Select
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-4 text-right">
                            <button
                                onClick={handleCloseModal}
                                className="btn btn-sm btn-error text-white"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;