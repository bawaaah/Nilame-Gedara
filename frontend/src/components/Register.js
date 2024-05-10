import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import {  registerValidation } from '../helper/validate';
import { registerUser } from '../helper/helper'
import '../styles/Register.css'

export default function Register() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username : '',
      email : '',
      phone : '',
      password : ''
    },
    validate :  registerValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async values => {
  let registerPromise = registerUser(values);

  toast.promise(registerPromise, {
    loading: 'Creating..',
    success: <b>Register Successfully...!</b>,
    error: <b>Could not Register.</b>
  });

  try {
    await registerPromise;
    navigate('/login');
  } catch (error) {
    // Handle errors if necessary
    toast.error('Registration failed:', error);
    // You can also use toast.error() here to display a user-friendly error message
  }
}
  }
  )




  return (
    <div className="_main_container">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="signup_form_container">
        <div className="_left">
          <h1 style={{ textAlign: 'center', color: '#2A0A0B', fontFamily: 'Josefin Sans', fontWeight: 'bold', fontSize: '40px'}}>Welcome to</h1>
          <h1 style={{ textAlign: 'center', color: '#2A0A0B', fontFamily: 'Josefin Sans', fontWeight: 'bold', fontSize: '40px' }}>Nilame Gedara</h1><br/>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="NameInput" className="form-label" style={{fontFamily: 'Josefin Sans'}}>Full Name</label>
              <input {...formik.getFieldProps('username')} type="text" className="form-control" id="username" name="username"   placeholder="Enter your name" />
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label" style={{fontFamily: 'Josefin Sans'}}>Email address</label>
              <input {...formik.getFieldProps('email')} type="text" className="form-control" id="email" name="email"   placeholder="email@email.com"  />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneInput" className="form-label" style={{fontFamily: 'Josefin Sans'}}>Phone</label>
              <input {...formik.getFieldProps('phone')} type="text" className="form-control" id="phone" name="phone"  placeholder="Phone" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label" style={{fontFamily: 'Josefin Sans'}}>Password</label>
              <input {...formik.getFieldProps('password')} type="password" className="form-control" id="password" name="password"   placeholder="Password" />
            </div>
            <br />
            <button type="submit" className="register_button">Register</button>
            <div className="form-label" style={{fontFamily: 'Josefin Sans'}}>Got an account?</div>
            <Link to="/login">
              <button type="button" className="_login" >Login here!</button>
            </Link>
            <br/>
          </form>
        </div>
        <div className="_right"></div>
      </div>
    </div>
  )
}
