const UserModel = require("../models/User.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config.js');



const verifyUser = async function(req, res, next) {
  try {
      const { email } = req.method == "GET" ? req.query : req.body;

      // Check the user existence
      let exist = await UserModel.findOne({ email });
      if (!exist) return res.status(404).send({ error: "Can't find User!" });
      next();

  } catch (error) {
      return res.status(404).send({ error: "Authentication Error" });
  }
};

const register = async function(req, res) {
  try {
      const { username, email, phone, password } = req.body;

      const existingUsername = await UserModel.findOne({ username });
      if (existingUsername) {
          return res.status(400).json({ error: "Username already exists. Please choose a different username." });
      }

      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
          return res.status(400).json({ error: "Email already exists. Please use a different email address." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
          username,
          email,
          phone,
          password: hashedPassword
      });

      await newUser.save();

      return res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Internal server error." });
  }
};

const login = async function(req, res) {
  const { email, password } = req.body;

  try {
      UserModel.findOne({ email })
          .then(user => {
              bcrypt.compare(password, user.password)
                  .then(passwordCheck => {

                      if (!passwordCheck) return  res.status(400).send({ error : "Dont have Password"})

                      const token = jwt.sign({
                          userId: user._id,
                          email: user.email
                      }, ENV.JWT_SECRET, {expiresIn : "24h"});

                      return res.status(200).send({
                          msg : "Login Successful..!",
                          email : user.email,
                          username : user.username,
                          token
                      });
                  })
                  .catch(error => {
                      return res.status(400).send({ error : "Password does not match"})
                  })
          })
          .catch(error => {
              return res.status(404).send({error : "Email not Found"})
          })
  } catch (error) {
      return  res.status(500).send({error});
  }
};

const getUser = async function(req, res) {
const { email } = req.params;
console.log({ email });

try {
  if (!email) return res.status(501).send({ error: "Email not found" });

  const user = await UserModel.findOne({ email });

  if (!user) return res.status(401).send({ error: "User not found" });

  const { password, ...rest } = Object.assign({}, user.toJSON());

  return res.status(200).send(rest);
} catch (error) {
  res.status(500).send({ error });
}
};

const getUsers = async function(req, res) {
try {
  const users = await UserModel.find({}, '-password');
  return res.status(200).send(users);
} catch (error) {
  res.status(500).send({ error });
}
};

const updateUser = async function(req, res) {
  try {
      const { userId } = req.user;

      if (!userId) {
          return res.status(400).send({ error: "Missing id" });
      } else {
          const body = req.body;

          const updatedUser = await UserModel.findOneAndUpdate(
              { _id: userId },
              body,
              {
                  new: true,
              }
          );

          if (!updatedUser) {
              return res.status(404).send({ error: "User not found" });
          } else {
              return res.status(200).send({ msg: "Record updated successfully" });
          }
      }
  } catch (error) {
      console.error(error);
      return res
          .status(500)
          .send({ error: error.message || "Internal server error" });
  }
}; 

const deleteUser = async function(req, res){
try {
  const { userId } = req.user;

  if (!userId) {
      return res.status(400).send({ error: "Missing id" });
  } else {
      const deletedUser = await UserModel.findOneAndDelete({ _id: userId});

      if (!deletedUser) {
          return res.status(404).send({ error: "User not found" });
      } else {
          return res.status(200).send({ msg: "Record deleted successfully" });
      }
  }
} catch (error) {
  console.error(error);
  return res
      .status(500)
      .send({ error: error.message || "Internal server error" });
}
};

const deleteAnuser = async function(req, res) {
  try {
      const id = req.params.id;
      const deletedUser = await UserModel.findOneAndDelete({ _id: id });

      if (!deletedUser) {
          return res.status(404).send({ error: "User not found" });
      } else {
          return res.status(200).send({ msg: "User deleted successfully" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message || "Internal server error" });
  }
};

const forgotPassword = async function(req, res) {
const { email } = req.body;

try {
  const findUser = await UserModel.findOne({ email });

  if (!findUser) {
    return res.status(404).send({ error: "Email not found" });
  }

  const secret = ENV.JWT_SECRET + findUser.password;
  const token = jwt.sign(
    { email: findUser.email, id: findUser._id },
    secret,
    { expiresIn: "15m" }
  );

  const link = `http://localhost:8070/resetPassword/${findUser._id}/${token}`;

  console.log(link);
} catch (error) {}
};

const resetPassword = async function(req, res) {
const { email, password, newPassword } = req.body;
console.log("finding user");

const user = await UserModel.findOne({ email });

console.log(user);
if (!user) return res.status(404).send({ error: "Email not found" });

if (!password == user.password)
  return res.status(400).send({ error: "Password incorrect" });
console.log(password);
console.log(user.password);

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

try {
  console.log("updating user");
  const updatedUser = await UserModel.findOneAndUpdate(
    { email: req.body.email },
    { password: hashedPassword },
    {
      new: true,
    }
  );

  console.log(updatedUser);

  if (!updatedUser) {
    return res.status(404).send({ error: "User not found" });
  } else {
    return res.status(200).send({ msg: "Password reset successfully" });
  }
} catch (error) {
  return res
    .status(500)
    .send({ error: error.message || "Internal server error" });
}
};

const getPassword = async function(req, res) {
const { email } = req.body;

const user = await UserModel.findOne({ email });

if (!email) {
  return res.status(400).send({ error: "Email not found" });
}

if (user) {
  return res.status(200).send({ password: user.password });
} else {
  return res.status(404).send({ error: "User not found" });
}
};

/**GET  http://localhost:8070/api/generateOTP
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGen();
    res.status(201).send({ code : req.app.locals.OTP });
}

*/
/**GET  http://localhost:8070/api/verifyOTP
export async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null;  //reset the OTP value
      req.app.locals.resetSession = true;  //start the session for reset password
      return res.status(201).send({ msg : "Verify Succesfully" });
    }
    else{
      return res.status(400).send({ error : "Invalid OTP" });
    }
}

*/
/**GET  http://localhost:8070/api/createResetSession
//successfully redirect user when OTP is valid
export async function createResetSession(req, res) {
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false;   //allow access to this route only once
        return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({ error : "Session expired!"})
}
*/
/**PUT http://localhost:8070/api/resetPassword*/
//update the password when we have valid session
/*export async function resetPassword(req, res) {
    try {

        if(!res.app.locals.resetSession){
          return res.status(440).send({ error : "Session expired" })
        }
    
        const { email, password } = req.body;
    
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.status(404).send({ error: "Email not found" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateResult = await UserModel.updateOne(
          { email: user.email },
          { password: hashedPassword }
        );
    
        if (updateResult.nModified == 0) {
          throw new Error("No document matches the provided query.");
        }
    
        return res.status(201).send({ msg: "Record updated" });
    
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
}       */

/**GET  http://localhost:8070/api/user/username*/
/*
export async function getUser(req, res) {
    const { email } = req.params;

    try {
        if (!email) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ email });

        if (!email) {
            return res.status(404).send({ error: "User not found" });
        }

        
        const { password, ...rest } = user.toObject();
        return res.status(200).send(rest);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
} */

module.exports = { updateUser, verifyUser, register, login, getUser, getUsers, deleteUser, deleteAnuser, forgotPassword, resetPassword, getPassword }