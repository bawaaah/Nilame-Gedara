import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { emailValidate } from '../helper/validate';
import { passwordValidate } from '../helper/validate';
import { verifyPassword } from '../helper/helper';

import { useAuthStore } from '../store/store';

export default function Login() {
  const navigate = useNavigate();
  const setEmail = useAuthStore((state) => state.setEmail);
  const email = useAuthStore((state) => state.auth.email);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: async (values) => {
      const emailErrors = emailValidate(values);
      const passwordErrors = passwordValidate(values);

      return { ...emailErrors, ...passwordErrors };
    },
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      try {
        const loginPromise = verifyPassword({ email: values.email, password: values.password });

        toast.promise(loginPromise, {
          loading: 'Checking credentials...',
          success: 'Login successful',
          error: (err) => `Login error: ${err.message}`, // Display the error message
        });

        const res = await loginPromise;
        const { token } = res.data;
        localStorage.setItem('token', token);

        setEmail(values.email);
        navigate('/profile');
      } catch (error) {
        // Handle errors here
        toast.error('Login error: ' + error.message);
      }
    },
  });

  return (
    <div className="main_container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="login_form_container">
        <div className="left">
          <h1 className="_h1" style={{ textAlign: 'center', color: '#2A0A0B', fontFamily: 'Josefin Sans', fontWeight: 'bold', fontSize: '30px' }}>Welcome Back</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label" style={{ fontFamily: 'Josefin Sans' }}>Email address</label>
              <input {...formik.getFieldProps('email')} type="email" className="form-control" id="email" name="email" placeholder="email@email.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label" style={{ fontFamily: 'Josefin Sans' }}>Password</label>
              <input {...formik.getFieldProps('password')} type="password" className="form-control" id="password" name="password" placeholder="Password" />
            </div>

            <button type="submit" className="register_button">Log in</button><br />
            <div className="form-label" style={{ fontFamily: 'Josefin Sans' }}>Don't have an account?</div>
            <Link to="/register">
              <button type="button" className="_login" style={{ fontFamily: 'Josefin Sans', paddingRight: '280px' }}>Sign Up</button>
            </Link>
            <div className="form-label" style={{ fontFamily: 'Josefin Sans' }}>Forgot Password?</div> <Link className='_login' style={{ fontFamily: 'Josefin Sans' }} to="/email">Recover Now</Link>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
