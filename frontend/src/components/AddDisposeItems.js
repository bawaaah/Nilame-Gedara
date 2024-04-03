import React, { useState, useEffect } from "react";
import axios from "axios" ;
import { useParams } from 'react-router-dom';


export default function AddDisposeItems() {

    const {id} = useParams();
    const [isDisposed, setisDisposed] = useState("");
    const [qty, setPID] = useState("");
    const [DisposedQty, setDisposedQty] = useState("");

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []); 

    
    function getProducts() {
        axios.get(`http://localhost:8070/products/get/${id}`)
           .then((res) => {
               setProducts(res.data.product); // Assuming res.data is an array
            }).catch((err) => {
                alert(err);
            });
        }
       
    

    function sendData(e){

        e.preventDefault();

        const newProduct = {

            qty,
            isDisposed,
            DisposedQty 

        }

        //if authentication we can add another parameter
        axios.put(`http://localhost:8070/products/addDispoed/${id}`, newProduct ).then(() => {
            alert("Product Updated!")
        }).catch((err) => {
            alert(err)
        })

    }

    
    


    return (

        <div className="container">


        <form onSubmit={sendData}> 
            <div className="mb-3">
                <label for="name" >Product name</label>
                <input type="text" className="form-control" id="name" value={products.name}/>
            </div>
            
            <div className="mb-3">
                <label for="pid" >Product Quantity</label>
                <input type="number" className="form-control" id="pid" value={products.pid} />
            </div>

           
            <div className="mb-3">
            <label for="radio" >Product Category</label>
            <input type="text" className="form-control" id="pid" value={products.category} />
            </div>

            <div className="mb-3">
                <label for="pid" >Product Quantity</label>
                <input type="number" className="form-control" id="pid" placeholder="Enter Disposed Quantity" onChange={(e) => {

                    setDisposedQty(e.target.value);
                    setisDisposed(true);
                    setPID(products.pid)


                }} />
            </div>




            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>

    

        </div>
    )
}