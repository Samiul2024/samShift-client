import { useState } from "react";
import { useNavigate } from "react-router";

const TrackSearch = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!trackingId) return;
    navigate(`/track/${trackingId}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter Tracking ID"
        className="input input-bordered w-full"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <button className="btn btn-primary">Track</button>
    </form>
  );
};
export default TrackSearch;