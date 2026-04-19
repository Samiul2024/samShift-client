import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    console.log(parcelId);

    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: parcelInfo } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    if (isPending) {
        return '...loading'
    }

    console.log(parcelInfo);
    const amount = parcelInfo.delivery_cost;
    const amountInCents = amount * 100;
    console.log(amountInCents);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true); // 🔥 START LOCK

        try {
            const card = elements.getElement(CardElement);
            if (!card) return;

            // STEP 1: Create payment method
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (error) {
                setError(error.message);
                setIsProcessing(false); // 🔥 UNLOCK
                return;
            }

            setError('');

            // STEP 2: Create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            });

            const clientSecret = res.data.clientSecret;

            // STEP 3: Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setIsProcessing(false); // 🔥 UNLOCK
                return;
            }

            // STEP 4: Success
            if (result.paymentIntent.status === 'succeeded') {

                const transactionId = result.paymentIntent.id;

                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    tracking_id: parcelInfo.tracking_id 
                };

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {

                    await Swal.fire({
                        title: "Payment Successful 🎉",
                        html: `
                        <p>Your parcel payment has been completed successfully.</p>
                        <p><strong>Transaction ID:</strong> ${transactionId}</p>
                    `,
                        icon: "success",
                        confirmButtonText: "Go to My Parcels",
                        confirmButtonColor: "#16a34a",
                    });

                    navigate("/dashboard/myParcels");
                }
            }

        } catch (err) {
            console.error(err);
            setError("Payment failed. Try again.");
            setIsProcessing(false); // 🔥 UNLOCK
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-4 border rounded">

                </CardElement>
                <button
                    type='submit'
                    disabled={!stripe || isProcessing}
                    className='text-black btn btn-primary w-full'
                >
                    {isProcessing ? "Processing..." : `Pay $${amount}`}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form >
        </div >
    );
};

export default PaymentForm;