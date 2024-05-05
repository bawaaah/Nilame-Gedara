import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    const styles = {
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            padding: '80px',
            backgroundColor: '#fcf4d9',
            width: '800px',
        },
        item: {
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        title: {
            color: '#333',
            fontSize: '20px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '10px',
        },
        image: {
            width: '100%',
            height: '350px',
            objectFit: 'cover',
            borderRadius: '8px',
        },
        paragraph: {
            color: '#666',
            fontSize: '16px',
            lineHeight: '1.5',
        },
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
            marginTop: '10px',
        },
        search: {
            padding: '10px',
            marginBottom: '10px',
            fontSize: '14px',
            width: '300px',
            boxSizing: 'border-box',
            border: '2px solid #ccc',
            borderRadius: '10px',
            outline: 'none',
            transition: 'border-color 0.2s',
        },
        dropdown: {
            padding: '10px',
            marginBottom: '10px',
            marginRight: '10px',
            fontSize: '14px',
            border: '2px solid #ccc',
            borderRadius: '10px',
            outline: 'none',
            cursor: 'pointer',
            backgroundColor: 'white',
            transition: 'background-color 0.2s',
        },
        srch: {
            textAlign: 'center',
        }
    };

    return (
        <div style={styles.srch}>
            <select onChange={handleFilterChange} style={styles.dropdown}>
                <option value="name">Product Name</option>
                <option value="category">Category</option>
            </select>
            <input
                type="text"
                placeholder={`Search by ${filter === "name" ? "product name" : "category"}...`}
                value={search}
                onChange={handleSearchChange}
                style={styles.search}
            />
            <div style={styles.container}>
                {filteredItems.map((item, index) => (
                    <div key={index} style={styles.item}>
                        <p style={styles.title}>{item.name}</p>
                        {item.image && (
                            <img src={`data:image;base64,${item.image}`} alt={item.name} style={styles.image} />
                        )}
                        <p style={styles.paragraph}>{item.category}</p>
                        <p style={styles.paragraph}>Number of Quantity: {item.pQty}</p>
                        <Link to={`/SingleItem/${item._id}`}>
                            <button style={styles.button} value={item._id}>
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
