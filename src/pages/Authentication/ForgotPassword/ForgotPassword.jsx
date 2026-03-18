import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { resetPassword } = useAuth();
    const navigate = useNavigate(); // ✅ correct navigation hook

    const onSubmit = async (data) => {
        const { email } = data;

        try {
            await resetPassword(email);

            toast.success("Password reset email sent ✅");

            reset();

            // ⏳ small delay so user can see toast
            setTimeout(() => {
                navigate('/verify-code'); // ✅ correct navigation
            }, 1500);

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">

                <h1 className="text-4xl font-bold">Forgot Password</h1>
                <p className="text-sm text-gray-500">
                    Enter your email to receive a reset link
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        {/* EMAIL */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered"
                            placeholder="Email"
                        />

                        {
                            errors.email?.type === 'required' &&
                            <p className='text-red-500'>Email is required</p>
                        }

                        {/* BUTTON */}
                        <button className="btn btn-primary text-black mt-4">
                            Send Reset Email
                        </button>

                    </fieldset>

                    {/* BACK TO LOGIN */}
                    <p className="mt-2">
                        <small>
                            Remember your password?
                            <Link className='btn btn-link' to="/login">
                                Login
                            </Link>
                        </small>
                    </p>
                </form>

            </div>
        </div>
    );
};

export default ForgotPassword;