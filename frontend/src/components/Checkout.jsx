import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import '../components/styles/checkout2.css'

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

    const deleteOrder = () => {
        axios.delete(`http://localhost:8070/checkout/deleteOrder/${orderDetails._id}`)
            .then(() => {
                alert("Product deleted successfully")
                window.location.href = 'http://localhost:3000/home2';
            })
            .catch(err => {
                alert("Error deleting product: " + err.message)
            });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="new">
            <div style={styles.mainContainer}>
                <div style={styles.styledContainer}>
                    <div style={styles.header}>
                        <h3 style={styles.heading}>Product Name: {orderDetails.productName}</h3>
                    </div>
                    <div style={styles.details}>
                        <h5>Number of Bestman with Groom: <strong>{orderDetails.count}</strong></h5>
                        <h5>Unit Price: <strong>{orderDetails.unitPrice}</strong></h5>
                        <h5>Rental Date: <strong>{orderDetails.date ? orderDetails.date.split("T")[0] : 'Loading date...'}</strong></h5>
                        <h5>Total: <strong>RS:{orderDetails.total}</strong></h5>
                    </div>
                    <div style={styles.buttonContainer}>
                        <button style={styles.button} onClick={generatePDF}>Generate and Print Report</button>
                        <Link to={`/update/${orderDetails._id}`} style={{ textDecoration: 'none' }}>
                            <button style={styles.button}>Update</button>
                        </Link>
                        <button style={styles.button} onClick={deleteOrder}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
    },
    styledContainer: {
        width: '90%',
        maxWidth: '600px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '20px',
        borderLeft: '5px solid #c89513'
    },
    header: {
        paddingBottom: '10px',
        borderBottom: '2px dashed #c89513',
        marginBottom: '20px'
    },
    heading: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center'
    },
    details: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '10px'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '20px'
    },
    button: {
        flexGrow: 1,
        padding: '10px 15px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#c89513',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
            backgroundColor: '#a57a10',
            transform: 'translateY(-2px)'
        },
        '&:active': {
            backgroundColor: '#805c0d',
            transform: 'translateY(1px)'
        }
    }
};

export default Checkout;
