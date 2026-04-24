import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RiderPanel = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    //  GET ASSIGNED PARCELS (AUTO REFRESH)
    const {
        data: parcels = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["riderParcels", user?.email],
        enabled: !!user?.email,
        refetchInterval: 5000, // 🔥 auto refresh every 5 sec
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/assigned/rider?email=${user.email}`
            );
            return res.data;
        },
    });

    //  ACCEPT DELIVERY
    const acceptMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/parcels/rider-accept/${id}`);
            return res.data;
        },
        onSuccess: (data) => {
            Swal.fire("Accepted!", data.message || "Delivery accepted", "success");
            refetch();
        },
        onError: (err) => {
            Swal.fire("Error!", err.response?.data?.message || "Failed", "error");
        },
    });

    //  UPDATE STATUS
    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(
                `/parcels/update-status/${id}`,
                { status }
            );
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Updated!", "Status updated successfully", "success");
            refetch();
        },
        onError: (err) => {
            Swal.fire("Error!", err.response?.data?.message || "Failed", "error");
        },
    });

    // HANDLERS
    const handleAccept = (parcel) => {
        acceptMutation.mutate(parcel._id);
    };

    const handleUpdate = (parcel, status) => {
        updateStatusMutation.mutate({
            id: parcel._id,
            status,
        });
    };

    if (isLoading) {
        return <p className="p-6 text-center">Loading parcels...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🚚 Rider Panel</h2>

            {parcels.length === 0 ? (
                <p className="text-gray-500">No assigned parcels 🚫</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Parcel</th>
                                <th>Route</th>
                                <th>Delivery</th>
                                <th>Rider</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {parcels.map((parcel, i) => (
                                <tr key={parcel._id}>
                                    <td>{i + 1}</td>

                                    <td className="font-semibold">{parcel.title}</td>

                                    <td>
                                        {parcel.senderDistrict} → {parcel.receiverDistrict}
                                    </td>

                                    <td>
                                        <span className="badge badge-outline">
                                            {parcel.delivery_status}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="badge badge-info">
                                            {parcel.rider_status || "pending"}
                                        </span>
                                    </td>

                                    <td className="space-x-2">

                                        {/*  ACCEPT BUTTON */}
                                        {parcel.rider_status !== "accepted" && (
                                            <button
                                                onClick={() => handleAccept(parcel)}
                                                disabled={acceptMutation.isPending}
                                                className="btn btn-xs btn-primary"
                                            >
                                                {acceptMutation.isPending
                                                    ? "Accepting..."
                                                    : "Accept"}
                                            </button>
                                        )}

                                        {/*  AFTER ACCEPT */}
                                        {parcel.rider_status === "accepted" && (
                                            <>
                                                {/* STEP 1 */}
                                                {parcel.delivery_status === "accepted-by-rider" && (
                                                    <button
                                                        onClick={() =>
                                                            handleUpdate(parcel, "picked-up")
                                                        }
                                                        disabled={updateStatusMutation.isPending}
                                                        className="btn btn-xs btn-info"
                                                    >
                                                        Picked
                                                    </button>
                                                )}

                                                {/* STEP 2 */}
                                                {parcel.delivery_status === "picked-up" && (
                                                    <button
                                                        onClick={() =>
                                                            handleUpdate(parcel, "in-transit")
                                                        }
                                                        disabled={updateStatusMutation.isPending}
                                                        className="btn btn-xs btn-warning"
                                                    >
                                                        Transit
                                                    </button>
                                                )}

                                                {/* STEP 3 */}
                                                {parcel.delivery_status === "in-transit" && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleUpdate(parcel, "delivered")
                                                            }
                                                            disabled={updateStatusMutation.isPending}
                                                            className="btn btn-xs btn-success"
                                                        >
                                                            Delivered
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleUpdate(parcel, "failed")
                                                            }
                                                            disabled={updateStatusMutation.isPending}
                                                            className="btn btn-xs btn-error"
                                                        >
                                                            Failed
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RiderPanel;