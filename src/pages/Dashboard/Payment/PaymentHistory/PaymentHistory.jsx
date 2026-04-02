import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })
    if (isPending) {
        return '....loading'
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Amount ($)</th>
                            <th>Method</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover">
                                <td>{index + 1}</td>

                                <td className="text-xs break-all">
                                    {payment.parcelId}
                                </td>

                                <td className="font-semibold text-green-600">
                                    ${payment.amount}
                                </td>

                                <td className="capitalize">
                                    {Array.isArray(payment.paymentMethod)
                                        ? payment.paymentMethod[0]
                                        : payment.paymentMethod}
                                </td>

                                <td className="text-xs break-all">
                                    {payment.transactionId}
                                </td>

                                <td>
                                    {new Date(payment.paid_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;