import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/catalog.css'

function Catalog() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("name");

    useEffect(() => {
        getItems();
    }, []);

    function getItems() {
        axios.get("http://localhost:8070/add/getAllImages")
            .then(res => {
                setItems(res.data.itemSchema);
            })
            .catch(err => {
                alert("Error: " + err);
            });
    }

    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    function handleFilterChange(event) {
        setFilter(event.target.value);
    }

    const filteredItems = items.filter(item => {
        if (filter === "name") {
            return item.name.toLowerCase().includes(search.toLowerCase());
        } else {
            return item.category.toLowerCase().includes(search.toLowerCase());
        }
    });

    

    return (
        <div className="srch">
            <select onChange={handleFilterChange} className="dropdown">
                <option value="name">Product Name</option>
                <option value="category">Category</option>
            </select> <br /><br />
            <input
                type="text"
                placeholder={`Search by ${filter === "name" ? "product name" : "category"}...`}
                value={search}
                onChange={handleSearchChange}
                className="search"
            /> <br /><br />
            <div className="containerb">
                {filteredItems.map((item, index) => (
                    <div key={index} className="item">
                        <p className="title">{item.name}</p>
                        {item.image && (
                            <img src={`data:image;base64,${item.image}`} alt={item.name} className="image" />
                        )}
                        <br />
                        <p className="paragraph">{item.category}</p>
                        <p className="paragraph">Number of Quantity: {item.pQty}</p>
                        <Link to={`/SingleItem/${item._id}`}>
                            <button className="button" value={item._id}>
                                View
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Catalog;
