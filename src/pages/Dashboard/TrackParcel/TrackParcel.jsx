import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: updates = [], isPending } = useQuery({
    queryKey: ["tracking", trackingId],
    enabled: !!trackingId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${trackingId}`);
      return res.data;
    },
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Tracking ID: {trackingId}
      </h2>

      {!updates.length ? (
        <p className="text-gray-500">No tracking info found</p>
      ) : (
        <div className="space-y-4">
          {updates.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg shadow-sm"
            >
              <h3 className="font-semibold">{item.status}</h3>
              <p className="text-sm text-gray-600">{item.message}</p>
              <p className="text-xs text-gray-400">
                {item.location}
              </p>
              <p className="text-xs">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackParcel;