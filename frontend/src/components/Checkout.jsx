import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Heading = styled.h5`
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const Detail = styled.h5`
  margin: 5px 0;
  color: #666;
  font-family: 'Arial', sans-serif;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Arial', sans-serif;

  &:hover {
    background-color: #0056b3;
  }
`;

function Checkout() {
    const { id } = useParams();
    const [orderDetails, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrder();
    }, []);

    function getOrder() {
        axios.get(`http://localhost:8070/checkout/getOrder/${id}`)
            .then(res => {
                setOrder(res.data);
                setLoading(false);
            })
            .catch(err => {
                alert("Error: " + err);
                setLoading(false);
            });
    }

    const generatePDF = () => {
        if (orderDetails.date) {
            const doc = new jsPDF();
            const datePart = orderDetails.date.split("T")[0];

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(100);
            doc.text(`Product Name: ${orderDetails.productName}`, 10, 20);
            doc.text(`Order ID: ${orderDetails.orderId}`, 10, 30);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Number of Bestman with Groom: ${orderDetails.count}`, 10, 40);
            doc.text(`Unit Price: ${orderDetails.unitPrice}`, 10, 50);
            doc.text(`Rental Date: ${datePart}`, 10, 60);
            doc.text(`Total: RS:${orderDetails.total}`, 10, 70);
            doc.save('order-details.pdf');
        } else {
            alert("Date is not available for this order.");
        }
    }

    const deleteOrder = () =>{
        axios.delete(`http://localhost:8070/checkout/deleteOrder/${orderDetails._id}`)
            .then((req,res) => {
                alert("Product deleted successfully")
                window.location.href = 'http://localhost:3000/home2';

            })
            .catch((err) => {
                alert("Error deleting product: " + err.message)
                console.error(err)
            });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className='main'>
            <Heading>Product Name: {orderDetails.productName}</Heading>
            <Heading>Order ID: {orderDetails.orderId}</Heading>
            <Detail>Number of Bestman with Groom: <strong>{orderDetails.count}</strong></Detail>
            <Detail>Unit Price: <strong>{orderDetails.unitPrice}</strong></Detail>
            <Detail>Rental Date: <strong>{orderDetails.date ? orderDetails.date.split("T")[0] : 'Loading date...'}</strong></Detail>
            <Detail>Total: <strong>RS:{orderDetails.total}</strong></Detail>
            <div>
                <Button onClick={generatePDF}>Generate and Print Report</Button>
                <Link to={`/update/${orderDetails._id}`}><Button>Update</Button></Link>
                <Button onClick={deleteOrder}>Delete</Button>
            </div>
        </Container>
    );
}

export default Checkout;
