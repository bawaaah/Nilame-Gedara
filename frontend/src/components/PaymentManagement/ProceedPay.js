import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Payment from './Payment';

const PayBill = ({
    originalAmount
}) => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderID, setOrderID] = useState(null);
    // const location = useLocation(); // Get data passed from parent
    // const { amount: originalAmount } = location.state; 
  
    useEffect(() => {
      if (paymentSuccess && orderID) {
       // write your code
      }
    }, [paymentSuccess, orderID]);
  
  
    return (
      <Payment  // these inputs are mine for my case may you don't need this.
        firstname={'Pathum'}  // give your details
        lastname={'Gamage'}
        email={'dineth@me.com'}
        paymentTitle={'Nilame'}
        amount={originalAmount}
        itemid={'I002'}
        sendUserId={'U002'} // who send money
        reciveUserID={null} //who will recive
        setPaymentSuccess={setPaymentSuccess} //to do changes in implement page
        setOrderID={setOrderID}
      />
    );
  };

  export default PayBill;