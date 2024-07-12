import React, { useEffect, useState } from "react";
import axios from "axios";

const Payment = ({
  firstname,
  lastname,
  email,
  paymentTitle,
  amount,
  itemid,
  sendUserId,
  reciveUserID,
  setPaymentSuccess,
  setOrderID,
}) => {
  const [Pay, setPay] = useState({});
  const [success, setSuccess] = useState(false);

  const formattedAmount = parseFloat(amount);
  

  useEffect(() => {
    axios
      .put("http://localhost:8070/auth/calculateHash", null, {
        params: { amount: formattedAmount }, // Send amount as a request parameter
      })
      .then((res) => {
        console.log(res.data);
        setPay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [amount]);

  const savePaymentDetails = async () => {
    const paymentDetails = {
      orderId: Pay.orderId,
      customerName: `${firstname} ${lastname}`,
      userId: sendUserId, // Or reciveUserID, depending on your logic
      itemId: itemid,
      amount: Pay.amount,
    };

    try {
      const response = await axios.post("http://localhost:8070/payment/add", paymentDetails);
      console.log("Payment details saved:", response.data);
    } catch (error) {
      console.error("Error saving payment details:", error);
    }
  };

   useEffect(() => {
     if (success) {
       
      savePaymentDetails();// to save payment details in database

     }
   }, [success]);

  var payment = {
    sandbox: true,
    merchant_id: "1226537",   //change your merchant_id
    return_url: "http://sample.com/return",
    cancel_url: "http://sample.com/cancel",
    notify_url: "http://sample.com/notify", // important but need public url not local host to recive data
    order_id: Pay.orderId,
    items: paymentTitle,
    amount: Pay.amount,
    currency: "LKR",
    hash: Pay.hash,
    first_name: firstname,
    last_name: lastname,
    email: email,
    phone: "",
    address: "",
    city: "",
    country: "",
  };

  console.log(payment);

  function pay() {
  
    window.payhere.startPayment(payment);
  }

  window.payhere.onCompleted = function onCompleted(order_id) {
    console.log("Payment completed. OrderID:" + order_id);
    setPaymentSuccess(true);
    setSuccess(true); // to do changes in implement page
    setOrderID(order_id); // to save in database
  };

  return (
    <button onClick={pay} className="btn btn-primary btn-ServiceProvider-1 px-1">
      Pay with Payhere
    </button>
  );
};

export default Payment;