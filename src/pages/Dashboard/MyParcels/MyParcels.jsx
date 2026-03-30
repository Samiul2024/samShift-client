import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    // console.log(parcels);

    //  DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/parcels/${id}`);
                Swal.fire("Deleted!", "Parcel removed.", "success");
                refetch();
            }
        });
    };

    //  PAY (dummy for now)
    const handlePay = (parcel) => {
        Swal.fire("Payment", `Proceed to pay ${parcel.delivery_cost} BDT`, "info");
        navigate(`/dashboard/payment/${parcel}`);
    };

    //  VIEW DETAILS
    const handleView = (parcel) => {
        Swal.fire({
            title: "Parcel Details",
            html: `
                <p><b>Title:</b> ${parcel.title}</p>
                <p><b>Tracking ID:</b> ${parcel.tracking_id}</p>
                <p><b>From:</b> ${parcel.senderDistrict}</p>
                <p><b>To:</b> ${parcel.receiverDistrict}</p>
                <p><b>Cost:</b> ${parcel.delivery_cost} BDT</p>
            `,
        });
    };

    // if (isLoading) return <p className="text-center">Loading...</p>;
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                My Parcels ({parcels.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created At</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                {/* ✅ TITLE */}
                                <td className="font-medium">
                                    {parcel.title}
                                </td>

                                {/* TYPE */}
                                <td className="capitalize">
                                    {parcel.type}
                                </td>

                                {/* DATE */}
                                <td>
                                    {new Date(parcel.creation_date).toLocaleString()}
                                </td>

                                {/* COST */}
                                <td>{parcel.delivery_cost} BDT</td>

                                {/* PAYMENT STATUS */}
                                <td>
                                    <span
                                        className={`badge ${parcel.payment_status === "paid"
                                            ? "badge-success"
                                            : "badge-warning"
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleView(parcel)}
                                        className="btn btn-xs btn-info"
                                    >
                                        View
                                    </button>

                                    {parcel.payment_status === "unpaid" && (
                                        <button
                                            onClick={() => handlePay(parcel._id)}
                                            className="btn btn-xs btn-success"
                                        >
                                            Pay
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {parcels.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No parcels found
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyParcels;