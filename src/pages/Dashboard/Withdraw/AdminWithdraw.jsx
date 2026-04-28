import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminWithdraw = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["adminWithdraw"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/withdraw-requests");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/admin/withdraw-approve/${id}`);
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💸 Withdraw Requests</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map(r => (
            <tr key={r._id}>
              <td>{r.rider_email}</td>
              <td>৳ {r.amount}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "pending" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(r._id)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWithdraw;