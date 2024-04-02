import React, {useState, useEffect} from "react";
import axios from "axios";
import './styles/AllProducts.css'
import total from "./images/total.png";
import lowstock from "./images/lowstock.png";
import { Link } from "react-router-dom";


export default function AllProducts(){

    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [productLowCount, setProductLowCount] = useState(0);
    const [damagedCount, setdamagedCount] = useState(0);
    const [disposedCount, setdisposedCount] = useState(0);




    useEffect(() => {

        getProducts();
        getCount();
        getLowCount();
        getDamagedCount();
        getDisposedCount();
        

    }, [] );


    function getProducts(){

        axios.get("http://localhost:8070/products/").then((res) => {
            setProducts(res.data);
        }).catch((err) => {
            alert(err)
        })

    }

    function getCount() {

        // Fetch count of products
        axios.get("http://localhost:8070/products/count").then((res) => {
            setProductCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    function deleteProduct(productId) {
        axios.delete(`http://localhost:8070/products/delete/${productId}`)
            .then((res) => {
                alert("Product deleted successfully");
                // After successful deletion, refresh the component
                getProducts();
                getCount();
                getLowCount();
            })
            .catch((err) => {
                alert("Error deleting product: " + err.message); 
                console.error(err);
            });
    };

    function getLowCount() {

        // Fetch Low Stocked Items
        axios.get("http://localhost:8070/products/lowCount").then((res) => {
            setProductLowCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    function getDamagedCount() {

        // Fetch Low Stocked Items
        axios.get("http://localhost:8070/products/damagedItemCount").then((res) => {
            setdamagedCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    function getDisposedCount() {

        // Fetch Low Stocked Items
        axios.get("http://localhost:8070/products/disposedItemCount").then((res) => {
            setdisposedCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

    

    return(
        <div className="AllProductContainer">
            
            <div className="notify">

                <div className="notifySub">
                    <img src={total}/>
                    <p>Total Products: {productCount}</p>
                </div>

                <div className="notifySubLowStocked">
                    <img src={lowstock}/>
                    <p>Out of Stock: {productLowCount}</p>
                </div>

                <div className="notifySub">
                    <img src={total}/>
                    <p>Total Damaged Items: {damagedCount}</p>
                </div>
                
                <div className="notifySub">
                    <img src={total}/>
                    <p>Total Disposed Items: {disposedCount}</p>
                </div>

            </div>

            <div class="button-row">
                <button>Generate Reports</button>
                <button>Low Item List</button>
                <Link to={`/DamageItemList`} className="button link-button">Damaged Items</Link>
                <Link to={`/DisposedItemList`} className="button link-button">Disposed Items</Link>
                <button>Manage Item</button>
                <Link to={`/add`} className="button link-button">Add New Items</Link>

            </div>
            
            <hr/>


            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Product Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.pid}</td>
                            <td>{product.category}</td>
                            <td>
                                <Link to={`/edit/${product._id}`} className="button link-button update">Update</Link>
                                <Link to={`/AddDamageItems/${product._id}`} className="button link-button damage">Report Damage</Link>
                                <Link to={`/AddDisposeItems/${product._id}`} className="button link-button dispose">Dispose Item</Link>
                                <button className="button button-delete" onClick={() => deleteProduct(product._id)} >Delete</button>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>

    )

}