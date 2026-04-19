import React, { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TrackAllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [activeTrackingIds, setActiveTrackingIds] = useState([]);

  // 🔥 Get user parcels
  const { data: parcels = [], isPending } = useQuery({
    queryKey: ["myParcelsTracking", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // 🔥 MULTIPLE TRACKING QUERIES
  const trackingQueries = useQueries({
    queries: activeTrackingIds.map((id) => ({
      queryKey: ["tracking", id],
      queryFn: async () => {
        const res = await axiosSecure.get(`/tracking/${id}`);
        return res.data;
      },
      enabled: !!id,
    })),
  });

  // 🔥 Toggle open/close
  const handleToggle = (trackingId) => {
    setActiveTrackingIds((prev) =>
      prev.includes(trackingId)
        ? prev.filter((id) => id !== trackingId)
        : [...prev, trackingId]
    );
  };

  // 🔥 SAFELY GET QUERY BY INDEX
  const getQueryByTrackingId = (trackingId) => {
    const index = activeTrackingIds.findIndex((id) => id === trackingId);
    return trackingQueries[index];
  };

  if (isPending) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📦 Track All Parcels
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">
          No parcels found 🚫
        </p>
      ) : (
        <div className="space-y-4">
          {parcels.map((parcel) => {
            const isOpen = activeTrackingIds.includes(parcel.tracking_id);
            const query = getQueryByTrackingId(parcel.tracking_id);

            return (
              <div
                key={parcel._id}
                className="border rounded-lg p-4 shadow-sm"
              >
                {/* Parcel Info */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {parcel.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Tracking ID: {parcel.tracking_id}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggle(parcel.tracking_id)}
                    className="btn btn-sm btn-primary text-black"
                  >
                    {isOpen ? "Hide" : "Track"}
                  </button>
                </div>

                {/* Tracking Timeline */}
                {isOpen && (
                  <div className="mt-4 bg-gray-50 p-4 rounded">
                    {!query || query.isPending ? (
                      <span className="loading loading-spinner"></span>
                    ) : query.data?.length === 0 ? (
                      <p className="text-gray-500">
                        No tracking updates yet 🚫
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {query.data.map((item, index) => (
                          <div
                            key={item._id}
                            className="border-l-4 border-green-500 pl-3"
                          >
                            <div className="flex justify-between">
                              <h4 className="font-semibold">
                                {item.status}
                              </h4>
                              <span className="text-xs text-gray-400">
                                {new Date(
                                  item.created_at
                                ).toLocaleString()}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600">
                              {item.message}
                            </p>

                            <p className="text-xs text-gray-500">
                              📍 {item.location}
                            </p>

                            {index === 0 && (
                              <span className="badge badge-success mt-1">
                                Latest
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackAllParcels;