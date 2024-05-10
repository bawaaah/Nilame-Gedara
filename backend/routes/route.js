import { Router } from "express";
const router = Router();

/**import all controllers */

import * as controller from '../controller/appController.js';
import Auth ,{ localVariables } from "../middlewares/auth.js";
import {registerMail} from '../controller/mailer.js';


/**POST methods */

router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);//send the email
router.route('/authenticate').post(controller.verifyUser, (req,res) => res.end());//authenticate user
router.route('/login').post(controller.verifyUser, controller.login);//login in app
router.route('/forgotPassword').post(controller.forgotPassword); // forgot password 01/05
router.route('/getpassword').post(controller.getPassword);

/**Get methods */

router.route('/user/:email').get(controller.getUser);//get user with email
router.route('/users').get(controller.getUsers)//get all users
//router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);//generate random OTP
//router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);//verify generated OTP
//router.route('/createResetSession').get(controller.createResetSession);//reset all the variables

/**PUT methods */

router.route('/updateuser').put(Auth, controller.updateUser);//update the user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);//use to reset password

// DELETE Methods

router.route('/deleteuser').delete(Auth, controller.deleteUser); // delete user
router.route('/deleteAnUser/:id').delete(controller.deleteAnuser); // delete user by id


export default router;