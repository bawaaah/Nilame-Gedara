import React, { useState, useEffect } from "react";
import axios from "axios" ;
import { useParams } from 'react-router-dom';


export default function AddProduct() {

    const {id} = useParams();
    const [name, setName] = useState("");
    const [pid, setPID] = useState("");
    const [category, setCategory] = useState("");

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

            name,
            pid,
            category

        }

        //if authentication we can add another parameter
        axios.put(`http://localhost:8070/products/update/${id}`, newProduct ).then(() => {
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
                <input type="text" className="form-control" id="name" placeholder={products.name} onChange={(e) => {

                    setName(e.target.value);

                }}/>
            </div>
            
            <div className="mb-3">
                <label for="pid" >Product Quantity</label>
                <input type="number" className="form-control" id="pid" placeholder={products.pid} onChange={(e) => {

                    setPID(e.target.value);

                }} />
            </div>

           
            <div className="mb-3">
            <label for="radio" >Product Category</label>
            <input type="text" className="form-control" id="pid" value={products.category} />
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="category 01" onChange={(e) => {

                        setCategory(e.target.value);

                    }} />
                    <label class="form-check-label" for="category">
                        category 01
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="category 02" onChange={(e) => {

                        setCategory(e.target.value);

                    }} />
                    <label class="form-check-label" for="category">
                        category 02
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="category 03" onChange={(e) => {

                        setCategory(e.target.value);

                    }} />
                    <label class="form-check-label" for="category">
                        category 03
                    </label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Update Product</button>
        </form>

    

        </div>
    )
}