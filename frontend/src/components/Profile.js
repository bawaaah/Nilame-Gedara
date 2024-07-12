import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import avatar from './assests/profile.png';
import { updateUser } from '../helper/helper';
import { deleteUser } from '../helper/helper';

export default function Profile() {
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      username: apiData?.username || '',
      email: apiData?.email || '',
      phone: apiData?.phone || ''
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async values => {
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
    }
  });

  // Logout handler function
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  // User delete handler function
  function deleteCurrentUser() {
    let deletePromise = deleteUser();

    toast.promise(deletePromise, {
      loading: 'Deleting...',
      success: 'Deleted successfully',
      error: 'Failed to delete'
    });

    return deletePromise;
  }

  // Delete handler function
  async function handleDelete() {
    let deletePromise = await deleteCurrentUser();

    if (deletePromise.status === 200) {
      userLogout();
    }
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: '45%', paddingTop: '3em' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">You can update the details.</span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Full Name" />
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('phone')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Mobile No." />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Email*" />
              </div>

              <div className="name flex w-3/4 gap-10">
                <button className={styles.btn} type="submit">
                  Update
                </button>
                <button onClick={handleDelete} className={styles.btn2} type="button">
                  Delete
                </button>
              </div>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Come back later? <button onClick={userLogout} className="text-red-500" to="/">
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
