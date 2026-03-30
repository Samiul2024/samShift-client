import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    console.log(parcelId);

    const [error, setError] = useState('');
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
    const amount = parcelInfo.delivery_cost

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // console.log('error', error);
            setError(error.message);
        }
        else {
            setError('');
            console.log("payment method", paymentMethod);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-4 border rounded">

                </CardElement>
                <button type='submit'
                    disabled={!stripe}
                    className='text-black btn btn-primary w-full'
                >
                    Pay  ${amount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form >
        </div >
    );
};

export default PaymentForm;