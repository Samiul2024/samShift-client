import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WithdrawHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [] } = useQuery({
    queryKey: ["withdrawRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdraw-requests/my");
      return res.data;
    },
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4">📜 Withdraw History</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {requests.map(r => (
            <tr key={r._id}>
              <td>৳ {r.amount}</td>
              <td>{r.method}</td>
              <td>{r.status}</td>
              <td>{new Date(r.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawHistory;