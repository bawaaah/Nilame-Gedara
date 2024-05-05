import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'

function SingleItem() {
    const {id} = useParams()
    const [itemDetails, setItems] = useState([])

    const [name, setName] = useState()
    const [count, setCount] = useState()
    const [price, setPrice] = useState()
    const [date, setDate] = useState()
    const [isLinkActive, setIsLinkActive] = useState(false)
    const [iID,setiID] = useState()

    useEffect(() => {
        getItems();
    }, []);

    function getItems() {
        axios.get(`http://localhost:8070/add/getSingleItem/${id}`)
            .then(res => {
                setItems(res.data.item)
                setName(res.data.item.name)
                setPrice(res.data.item.rentalPrice)
                setiID(res.data.item._id)
                
            })
            .catch(err => {
                alert("Error: " + err);
            });
    }

    const getTomorrowsDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Styles
    // Styles
const styles = {
    detail: {
        display: 'flex',
        justifyContent: 'space-between', // Aligns children (left and right sections) with space between
        alignItems: 'flex-start', // Aligns items at the start of the cross axis
        padding: '20px',
        background: '#fcf4d9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '1000px',
        margin: '20px auto',
        fontFamily: '"Arial", sans-serif',
    },
    leftSection: { // This is for the photo and product name
        flex: '1', // Takes 1 part of the available space
        marginRight: '20px', // Adds spacing between the left and right sections
    },
    rightSection: { // This is for the input form and additional details
        flex: '2', // Takes 2 parts of the available space
    },
    imageContainer: {
        textAlign: 'center',
    },
    imageFrame: {
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    productImage: {
        width: '100%',
        height: 'auto',
        display: 'block',
    },
    form: {
        width: '100%',
        marginTop: '20px',
    },
    input: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: 'calc(100% - 22px)',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '4px',
    }
};


    function sendData(e) {

        if (parseInt(count) > itemDetails.pQty) {
            alert(`The maximum number of Bestman allowed is ${itemDetails.pQty}.`);
            return;
        }
        e.preventDefault();
    
        const data = {
            productName: name,
            count: count,
            unitPrice: price,
            date: date,
            iID: iID
            
        };
    
        axios.post("http://localhost:8070/order/add", data)
        .then(() => {
            alert("Order Added!");
            setIsLinkActive(true)
        })
        .catch(err => {
            alert("Error: " + err.response.data);  // More specific error message from server
        });

        
    }
    

    console.log(name,count,price,date)

    return (
        <div>
            <form onSubmit={sendData}>
                {itemDetails.image && (
                    <div style={styles.detail}>
                        <div style={styles.leftSection}>
                            <h2 id='name' onChange={(e) => setName(e.target.value)}>{itemDetails.name.toUpperCase()}</h2>
                            <div style={styles.imageContainer}>
                                <div style={styles.imageFrame}>
                                    <img src={`data:image;base64,${itemDetails.image}`} alt="Product" style={styles.productImage} />
                                </div>
                            </div>
                        </div>
                        <div style={styles.rightSection}>
                            <br />
                            <br />
                            <br />
                            <p>{itemDetails.description}</p>
                            <p id='price'><b>Rental Price: {itemDetails.rentalPrice}</b></p> 
                            <div>
                                <div>
                                    <label>No of Bestman with Groom: </label>
                                    <input type="text" max={itemDetails.pQty} style={styles.input} placeholder={`max no -> ${itemDetails.pQty}`} id='count' onChange={(e) => setCount(e.target.value)} required/>
                                </div>
                                <div>
                                    <label>Rental Date: </label>
                                    <input type="date" min={getTomorrowsDate()} style={styles.input} onChange={(e) => setDate(e.target.value)} required/>
                                </div><br />
                                <button type="submit" style={styles.button}>Submit</button>
                                {isLinkActive && (
                                    <Link to={`/Checkout/${itemDetails._id}`}><button style={styles.button}>Checkout</button></Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
    
}

export default SingleItem;
