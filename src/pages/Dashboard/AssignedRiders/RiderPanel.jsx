import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RiderPanel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔥 Get assigned parcels
  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["riderParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/assigned/rider?email=${user.email}`
      );
      return res.data;
    },
  });

  // 🔥 Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, tracking_id }) => {
      const res = await axiosSecure.patch(
        `/parcels/update-status/${id}`,
        { status, tracking_id }
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Status updated successfully", "success");
      refetch();
    },
  });

  const handleUpdate = (parcel, status) => {
    updateStatusMutation.mutate({
      id: parcel._id,
      status,
      tracking_id: parcel.tracking_id,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚚 Rider Panel</h2>

      {parcels.length === 0 ? (
        <p>No assigned parcels 🚫</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Parcel</th>
                <th>Route</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, i) => (
                <tr key={parcel._id}>
                  <td>{i + 1}</td>

                  <td>{parcel.title}</td>

                  <td>
                    {parcel.senderDistrict} → {parcel.receiverDistrict}
                  </td>

                  <td>
                    <span className="badge">
                      {parcel.delivery_status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        handleUpdate(parcel, "picked-up")
                      }
                      className="btn btn-xs btn-info"
                    >
                      Picked
                    </button>

                    <button
                      onClick={() =>
                        handleUpdate(parcel, "in-transit")
                      }
                      className="btn btn-xs btn-warning"
                    >
                      Transit
                    </button>

                    <button
                      onClick={() =>
                        handleUpdate(parcel, "delivered")
                      }
                      className="btn btn-xs btn-success"
                    >
                      Delivered
                    </button>
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