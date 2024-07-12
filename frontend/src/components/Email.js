import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { emailValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'
import { getUser } from '../helper/helper';
import { getPassword } from '../helper/helper';
import { sendResetEmail } from '../helper/helper';
import CryptoJS from "crypto-js";



import styles from '../styles/Username.module.css';



export default function Email() {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: async (values) => {
      const emailErrors = emailValidate(values);

      return { ...emailErrors};
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        const user = await getUser(values.email);

      if(user){
        const passData = await getPassword(values.email);
        const hashedPassword = passData.data.password;

        const object = {
            email: values.email,
            password: hashedPassword
        }

        const objectString = JSON.stringify(object);

        const encryptionKey = "123456$#@$^@1ERF";
        
        const encryptedObject = CryptoJS.AES.encrypt(objectString, encryptionKey).toString();

        const encodedEncryptedObject = encodeURIComponent(encryptedObject);
        

        const link = `http://localhost:3000/reset/${encodedEncryptedObject}`
        const response = sendResetEmail(values.email, link, "Reset Password");
        
        toast.promise(response, {
            loading: 'Sending email...',
            success: 'Check your email for password reset link',
            error: 'Error occured while sending email',
          });
      }
    }
  })


  return (
    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

    <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass} style={{ width : "50%"}}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Recovery</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            Enter Email.
          </span>
        </div>

        <form className='py-20' onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
                <input {...formik.getFieldProps('email')} className={styles.textbox} type="email" placeholder='email@email.com' />
                <button className={styles.btn} type='submit'>Next</button>
            </div>

        </form>

      </div>
    </div>
  </div>
  )
}
