import React, { useState } from "react";
import axios from "axios";

export default function AddCategory() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // State to store selected image

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image); // Append selected image to form data

        axios
            .post("http://localhost:8070/categorys/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                alert("Category Added!");
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
                    <label htmlFor="name">Category name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Category Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Add file input field for image */}
                <div className="mb-3">
                    <label htmlFor="image">Category Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description">Category description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter Product description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}
