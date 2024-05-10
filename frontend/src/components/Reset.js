import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css';
import {  resetPasswordValidation } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';
import CryptoJS from 'crypto-js';


export default function Reset() {

  const navigate = useNavigate();

  const { token } = useParams();
  console.log(token);

  const decodedEncryptedObject = decodeURIComponent(token);
  const decryptedBytes = CryptoJS.AES.decrypt(decodedEncryptedObject, "123456$#@$^@1ERF");
  const decryptedObjectString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const decryptedObject = JSON.parse(decryptedObjectString);

  console.log("decryptedObject");
  console.log(decryptedObject.email);
  console.log(decryptedObject.password);

  const formik = useFormik({
      initialValues: {
          password: '',
          confirm_pwd: ''
      },
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: async values => {
          if (values.password !== values.confirm_pwd) {
              toast.error("Passwords do not match");
          }
          else {
              let resetPromise = resetPassword({ email: decryptedObject.email, password: decryptedObject.password, newPassword: values.password })
              toast.promise(resetPromise, {
                  loading: 'Resetting password...',
                  success: 'Reset successful',
                  error: 'Password reset failed',
              });

              resetPromise.then(
                  navigate('/login')
              );
          }
      }

  });

 // if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  //if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  //if(status && status !== 201) return <Navigate to={'/login'} replace={true}></Navigate>

  return (
    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass} style={{ width : "50%"}}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Reset</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            Enter new password.
          </span>
        </div>

        <form className='py-20' onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='New Password' />
                <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="password" placeholder='Repeat Password' />
                <button className={styles.btn} type='submit'>Reset</button>
            </div>

        </form>

      </div>
    </div>
  </div>
  )
}
