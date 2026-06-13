import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const [loginError, setLoginError] = useState('');
    // console.log(location);

    const onSubmit = data => {
        // console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from);
            }).catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    setLoginError('Invalid email or password.');
                } else {
                    setLoginError('Login failed. Please try again.');
                }
            });
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">PLease Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email',
                                { required: true }
                            )} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'> Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password"
                            {...register('password', {
                                required: true, minLength: 6

                            })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }{
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }


                        <div>
                            <Link to="/forgot-password" className="link link-hover">
                                Forgot password?
                            </Link>
                        </div>
                        {
                            loginError && (
                                <p className="text-red-500 mt-2">
                                    {loginError}
                                </p>
                            )
                        }
                        <button className="btn btn-primary  text-black mt-4">Login</button>
                    </fieldset>
                    <p><small>New to this website?
                        <Link state={{ from }} className='btn btn-link' to="/register">Register</Link>
                    </small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;