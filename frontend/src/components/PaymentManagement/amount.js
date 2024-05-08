import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiscountCalculator from './addDiscount';

const Amount = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const HandleNavigate = () => {
    // Convert amount to number to ensure consistency
    const parsedAmount = parseFloat(amount);

    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      // Navigate to the child component and pass the amount as a prop
      navigate('/addDiscount', {
        state: { amount: parsedAmount }, // Pass the amount as a state object
      });
    } else {
      alert('Please enter a valid amount');
    }

  };

  return (
    <div>
    
        
      
      <h2>Test to enter amount</h2>
      <input
        type="text"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={HandleNavigate}>Go to Child Component</button>
     
      
    </div>
  );
};

export default Amount;
