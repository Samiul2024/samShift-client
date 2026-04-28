import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WithdrawRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bkash");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post("/withdraw-request", {
        amount: Number(amount),
        method
      });

      alert("Request sent!");
      setAmount("");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4">💰 Withdraw Request</h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="number"
          placeholder="Enter amount"
          className="input input-bordered w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          className="select select-bordered w-full"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
        </select>

        <button className="btn btn-primary w-full">
          Request Withdrawal
        </button>

      </form>
    </div>
  );
};

export default WithdrawRequest;