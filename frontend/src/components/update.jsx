import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #666;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #0056b3;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

function Update() {
  const { id } = useParams();
  const [itemDetails, setItems] = useState({ count: '', date: '' });
  const [count, setCount] = useState('');
  const [date, setDate] = useState('');
  const [iID, setiID] = useState('');

  useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get(`http://localhost:8070/checkout/getOrder2/${id}`)
      .then(res => {
        setItems(res.data);
        setiID(res.data.iID);
      })
      .catch(err => {
        alert("Error: " + err);
      });
  }

  function updteDate(e) {
    e.preventDefault();
    const formattedDate = formatDate(date);
    const data = { count, date: formattedDate };

    axios.put(`http://localhost:8070/checkout/updateOrder/${id}`, data)
      .then(() => {
        alert("Product Updated successfully");
        window.location.href = `http://localhost:3000/Checkout/${iID}`;
      })
      .catch((err) => {
        alert("Error Updating product: " + err.message);
        console.error(err);
      });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <Container>
      <Title>Update Order Details</Title>
      <Form onSubmit={updteDate}>
        <Label htmlFor="count">Number of Bestman with Groom:</Label>
        <Input id="count" type="text" value={itemDetails.count} onChange={(e) => setCount(e.target.value)} />

        <Label htmlFor="date">Rental Date:</Label>
        <Input id="date" type="date" value={itemDetails.date} onChange={(e) => setDate(e.target.value)} />

        <Button type="submit">Update</Button>
      </Form>
    </Container>
  );
}

export default Update;
