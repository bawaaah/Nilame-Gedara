import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

let nodeConfig = {
    service: "Gmail",
    auth: {
      user: ENV.EMAIL,
      pass: ENV.PASSWORD,
    },
  } 
  
  let transporter = nodemailer.createTransport(nodeConfig);
  
  let MailGenerator = new Mailgen({
      theme: 'default',
      product: {
          name: "Mailgen",
          link: "https://mailgen.js/",
      }
  })
  
  /** POST: http://localhost:8080/api/registerMail 
   * @param: {
   *  "email": "",
   *  "text": "",
   *  "subject": ""
   * }
  */
  
  //controller
  export const registerMail = async (req, res) => {
      const { userEmail, text, subject } = req.body;
  
      //body of the email
      var Email = {
          body: {
              name: userEmail,
              intro: 'Welcome to Nilame Gedara! We are very excited to have you on board.',
              outro: `<a href="${text}">To recover your account please click here. </a>`
          } 
      }
  
      //Pass the email to the MailGenerator
      var emailBody = MailGenerator.generate(Email);
      
      let message = {
          from : ENV.EMAIL,
          to : userEmail,
          subject : subject || "Welcome to Nilame Gedara",
          html : emailBody
      }
  
      //send Mail
      transporter.sendMail(message)
          .then(() => {
              return res.status(200).send({ msg : "Email sent successfully" });
          })
          .catch(error => res.status(500).send({ error }))
  }