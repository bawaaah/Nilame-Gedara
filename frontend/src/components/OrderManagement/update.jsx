import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/checkout.css';


const styles = {
  container: {
    maxWidth: '600px',
    margin: '60px auto',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
    backgroundImage: 'url("../images/cover2.jpeg")'
  },
  title: {
    textAlign: 'center',
    color: '#c89513',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '8px',
    color: '#555',
    fontSize: '18px',
    fontWeight: '500'
  },
  input: {
    padding: '12px',
    marginBottom: '20px',
    border: '2px solid #c89513',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease-in-out',
  },
  button: {
    padding: '12px',
    backgroundColor: '#c89513',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s, transform 0.2s',
    margin: '10px',
    width: '100%'
  },
  back: {
    display: 'flex'
  }
};

function Update() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [itemDetails, setItems] = useState({ count: '', date: '' }); 


  useEffect(() => {
    axios.get(`http://localhost:8070/checkout/getOrder2/${id}`)
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        alert("Error: " + err); 
      });
  }, [id]);


  function handleSubmit(e) {
    e.preventDefault(); 
    const data = { count: itemDetails.count, date: itemDetails.date.split('T')[0] }; 

    axios.put(`http://localhost:8070/checkout/updateOrder/${id}`, data)
      .then(() => {
        alert("Product Updated successfully"); 
        navigate(-1); 
      })
      .catch(err => {
        alert("Error Updating product: " + err.message); 
      });
    
  }

  return (
    <div className="MAIN">
      <div style={styles.container}>
        <h2 style={styles.title}>Update Order Details</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="count">Number of Bestman with Groom:</label>
          <input
            style={styles.input}
            id="count"
            type="text"
            value={itemDetails.count}
            onChange={(e) => setItems({...itemDetails, count: e.target.value})}
          />

          <label style={styles.label} htmlFor="date">Rental Date:</label>
          <input
            style={styles.input}
            id="date"
            type="date"
            value={itemDetails.date.split('T')[0]}
            onChange={(e) => setItems({...itemDetails, date: e.target.value})}
          />
          <div style={styles.back}>
            <button style={styles.button} type="submit">Update</button>
            <button style={styles.button} onClick={() => navigate(-1)} type="button">Back</button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Update;
