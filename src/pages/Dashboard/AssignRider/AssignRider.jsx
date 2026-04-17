import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRider = () => {

    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();

    const [selectedParcel, setSelectedParcel] = useState(null);

    // 🔥 Load assignable parcels
    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ['assignableParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/assignable');
            return res.data;
        }
    });

    // 🔥 Load riders by district (FIXED: use senderDistrict)
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

    // 🔥 Open Modal
    const handleOpenModal = (parcel) => {
        setSelectedParcel(parcel);
        riderModalRef.current.showModal();
    };
    const assignRiderMutation = useMutation({
        mutationFn: async ({ parcel, rider }) => {
            const res = await axiosSecure.patch(`/parcels/assign-rider/${parcel._id}`, {
                riderId: rider._id,
                riderEmail: rider.email,
                riderName: rider.name,
                tracking_id: parcel.tracking_id
            });
            return res.data;
        },
        onSuccess: (_, variables) => {
            Swal.fire({
                icon: 'success',
                title: 'Rider Assigned!',
                html: `
                <b>${variables.rider.name}</b> assigned to <br/>
                <span style="color:green;">${selectedParcel.title}</span>
            `
            });

            riderModalRef.current.close();
            setSelectedParcel(null);

            refetch(); // refresh parcels
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Assignment Failed'
            });
        }
    });
    // 🔥 Assign Rider
    const handleAssignRider = (rider) => {
        assignRiderMutation.mutate({
            parcel: selectedParcel,
            rider
        });
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
                            <th className="border">Type</th>
                            <th className="border">Sender</th>
                            <th className="border">Receiver</th>
                            <th className="border">Route</th>
                            <th className="border">Cost</th>
                            <th className="border">Date</th>
                            <th className="border">Action</th>
                            <th className="border">Status</th>
                        </tr>
                    </thead>

                    <tbody className="bg-gray-100">
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover">

                                <td className="border">{index + 1}</td>

                                <td className="border text-xs break-all">
                                    {parcel._id}
                                </td>

                                <td className="border font-semibold">
                                    {parcel.title}
                                </td>

                                <td className="border">{parcel.type}</td>

                                <td className="border">{parcel.senderName}</td>

                                <td className="border">{parcel.receiverName}</td>

                                <td className="border text-sm">
                                    {parcel.senderDistrict} → {parcel.receiverDistrict}
                                </td>

                                <td className="border font-bold text-green-600">
                                    {parcel.delivery_cost} BDT
                                </td>

                                <td className="border">
                                    {new Date(parcel.creation_date).toLocaleDateString()}
                                </td>
                                <td className="border">
                                    <button
                                        onClick={() => handleOpenModal(parcel)}
                                        className="btn btn-sm py-6 btn-primary text-black"
                                    >
                                        Assign Rider
                                    </button>
                                </td>

                                <td className="border">
                                    <span className="badge py-6 badge-warning">
                                        Not Collected
                                    </span>
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

            {/* 🔥 DIALOG MODAL */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">

                <div className="modal-box">

                    {/* 🔥 Parcel Info */}
                    <h3 className="font-bold text-lg mb-1">
                        Assign Rider
                    </h3>

                    <p className="text-sm mb-3">
                        Parcel: <span className="font-semibold text-green-600">
                            {selectedParcel?.title}
                        </span>
                    </p>

                    <p className="text-sm mb-4">
                        District: {selectedParcel?.senderDistrict}
                    </p>

                    {/* 🔥 Riders Table */}
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {riders.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No riders available for that district 🚫
                                        </td>
                                    </tr>
                                ) : (
                                    riders.map((rider, i) => (
                                        <tr key={rider._id}>
                                            <th>{i + 1}</th>
                                            <td>{rider.name}</td>
                                            <td>{rider.phone}</td>
                                            <td>{rider.email}</td>
                                            <td>
                                                <button
                                                    disabled={assignRiderMutation.isPending}
                                                    onClick={() => handleAssignRider(rider)}
                                                    className="btn btn-sm btn-primary text-black"
                                                >
                                                    {assignRiderMutation.isPending ? "Assigning..." : "Assign"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔥 Close */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>
        </div>
    );
};

export default AssignRider;