import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import '../styles/singleItem.css'

function SingleItem() {
    const {id} = useParams()
    const [itemDetails, setItems] = useState([])

    const [name, setName] = useState()
    const [count, setCount] = useState()
    const [price, setPrice] = useState()
    const [date, setDate] = useState()
    const [isLinkActive, setIsLinkActive] = useState(false)
    const [iID,setiID] = useState()
    const [email,setEmail] = useState()
    const [phone,setPhone] =useState()

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
            iID: iID,
            email: email,
            phone: phone
            
        };
    
        axios.post("http://localhost:8070/order/add", data)
        .then(() => {
            alert("Order Added!");
            setIsLinkActive(true)
        })
        .catch(err => {
            alert("Error: " + err.response.data);  // More specific error message from server
        });

        console.log(date)
    }

    function sendemail(){
        const details = {
            to:email,
            id:iID,
            pname:name,
            total:count*price
        }

        axios.post("http://localhost:8070/order/sendOrderMail",details)
        .then(() => {
            alert("email send");
        })
        .catch(err => {
            alert("Error: " + err.response.data);  // More specific error message from server
        });
        
    }
    return (
        <div className="main">
            <form onSubmit={sendData}>
                {itemDetails.image && (
                    <div >
                        <div className="detail">
                        <div className="leftSection">
                            <h2 id='name' onChange={(e) => setName(e.target.value)}>{itemDetails.name.toUpperCase()}</h2>
                            <div className="imageContainer">
                                <div className="imageFrame">
                                    <img src={`data:image;base64,${itemDetails.image}`} alt="Product" className="productImage" />
                                </div>
                            </div>
                        </div>
                        <div className="rightSection">
                            <br /><br /><br />
                            <p>{itemDetails.description}</p>
                            <p id='price'><b>Rental Price: {itemDetails.rentalPrice}</b></p>
                            <div>
                                <div>
                                    <label>No of Bestman with Groom: </label>
                                    <input min="0" type="number" max={itemDetails.pQty} className="input" placeholder={`max no -> ${itemDetails.pQty}`} id='count' onChange={(e) => setCount(e.target.value)} required/>
                                </div>
                                <div>
                                    <label>Rental Date: </label>
                                    <input type="date" min={getTomorrowsDate()} className="input" onChange={(e) => setDate(e.target.value)} required/>
                                </div>
                                <div>
                                    <label htmlFor="">E-mail</label>
                                    <input type="email" className="input" id="" placeholder='hello@example.com' onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="">Phone</label>
                                    <input type="tel" className="input" id="" placeholder='7xxxxxxxxx' maxLength="9" minLength="9" pattern='[7][0-9]{8}' onChange={(e) => setPhone(e.target.value)}/>
                                </div><br />
                                <button type="submit" className="button">Submit</button>
                                {isLinkActive && (
                                    <Link to={`/Checkout/${itemDetails._id}`}><button className="button" onClick={sendemail} >Checkout</button></Link>
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                )}
            </form>
        </div>

    );
    
}

export default SingleItem;
