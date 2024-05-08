import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // If using React Router for navigation
import PayBill from './ProceedPay';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Nilame from '../images/nilame.jpg';

const DiscountCalculator = () => {
  const location = useLocation(); // Get data passed from parent
  const { amount: originalAmount } = location.state;  
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(originalAmount);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigating to another page

  const handleDiscountCalculation = async () => {
    try {
      const response = await axios.post('http://localhost:8070/discount/validate-discount', { code });
      const discountPercentage = response.data.discountpercentage;

      setDiscountPercentage(discountPercentage);

      const discountAmount = (originalAmount * discountPercentage) / 100;
      setDiscountAmount(discountAmount);

      const newTotalAmount = originalAmount - discountAmount;
      setTotalAmount(newTotalAmount);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error applying discount');
    }
  };

//   const handleNextPage = () => {
//     navigate('/Pay', {
//         state: { amount: totalAmount }, // Pass the amount as a state object
//       });
//   };

  return (
    <div>
    <NavigationBar />
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Card className="w-80" style={{ backgroundColor: 'lightpink' }}>
        <Row noGutters>
          
          <Col md={6}>
            <Image
              src={Nilame}
              fluid
              className="w-100 h-100"
              alt="Clothing"
            />
          </Col>

          
          <Col md={6} className="d-flex flex-column justify-content-center">
            <p>Original Amount: Rs. {originalAmount}</p>

            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Enter Discount Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mr-2"
              />
              <Button variant="primary" onClick={handleDiscountCalculation}>
                Apply Discount
              </Button>
            </div>

            {discountPercentage > 0 && (
              <div className="mt-3">
                <p>Discount Percentage: {discountPercentage}%</p>
                <p>Discount Amount: Rs. {discountAmount.toFixed(2)}</p>
                <p>Total Amount after Discount: Rs. {totalAmount.toFixed(2)}</p>
              </div>
            )}

            {error && <p className="text-danger mt-3">{error}</p>}

            <div className="mt-3 text-right">
            <PayBill
                originalAmount = {totalAmount}
                />
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
    <Footer />
  </div>
  );
};

export default DiscountCalculator;
