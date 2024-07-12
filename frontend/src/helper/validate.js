import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** Validate login page email */
export async function emailValidate(values){
    const errors = emailVerify({}, values);

    if(values.email){

        //check for the user existance
        const { status } = await authenticate(values.email);

        if(status !== 200){
            errors.exist = toast.error("Email doesn't exist");
        }
    }

    return errors;
}


/** Validate login page password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/* Validate register form*/

export async function registerValidation(values) {
    const errors = usernameVerify({},values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    phoneNumberVerify(errors, values);

    return errors;
}

/**Validate profile page */

export async function profileValidation(values) {
    const errors = usernameVerify({},values);

    return errors;
}



//validate reset password

export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
     
    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match..!");
    }

    return errors;
}

/** validate password */
function passwordVerify(errors = {}, values){

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 8){
        errors.password = toast.error("Password must be more than 8 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}

/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }
    return error;
}

/** validate email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}

/** validate phone number */
function phoneNumberVerify(error = {}, values) {
    const phoneNumberRegex = /^[0-9]{10}$/; // Assuming 10 digit phone number
    if (!values.phone) {
        error.phone = toast.error("Phone Number Required...!");
    } else if (!phoneNumberRegex.test(values.phone)) {
        error.phone = toast.error("Invalid phone number...!");
    }

    return error;
}



