import React, { useState } from "react";
import axios from "axios" ;

export default function AddProduct() {

    const [name, setName] = useState("");
    const [pid, setPID] = useState("");
    const [category, setCategory] = useState("");
    

    function sendData(e){

        e.preventDefault();

        const newProduct = {

            name,
            pid,
            category

        }

        //if authentication we can add another parameter
        axios.post("http://localhost:8070/products/add", newProduct ).then(() => {
            alert("Product Added!")
        }).catch((err) => {
            alert(err)
        })


    }


    return (

        <div className="container">
        <form onSubmit={sendData}> 
            <div className="mb-3">
                <label for="name" >Product name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Product Name" onChange={(e) => {

                    setName(e.target.value);

                }}/>
            </div>
            
            <div className="mb-3">
                <label for="pid" >Product Quantity</label>
                <input type="number" className="form-control" id="pid" placeholder="Enter Product QTY" onChange={(e) => {

                    setPID(e.target.value);

                }} />
            </div>

           
            <div className="mb-3">
            <label for="radio" >Product Category</label>
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

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}