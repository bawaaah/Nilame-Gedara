import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [pid, setPID] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [rentalPrice, setRentalPrice] = useState("");
    const [image, setImage] = useState(null); // State to store selected image

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pid", pid);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("rentalPrice", rentalPrice);
        formData.append("image", image); // Append selected image to form data

        axios
            .post("http://localhost:8070/products/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                alert("Product Added!");
            })
            .catch((err) => {
                alert(err);
            });
    }

    // Function to handle image selection
    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="name">Product name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Product Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Add file input field for image */}
                <div className="mb-3">
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pid">Product Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="pid"
                        placeholder="Enter Product QTY"
                        onChange={(e) => setPID(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description">Product description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter Product description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="rentalPrice">Product rentalPrice</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rentalPrice"
                        placeholder="Enter Product rentalPrice"
                        onChange={(e) => setRentalPrice(e.target.value)}
                    />
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

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}
