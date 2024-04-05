import React, {useState, useEffect} from "react";
import axios from "axios";
import total from "./images/total.png";
import lowstock from "./images/lowstock.png";
import { Link } from "react-router-dom";


export default function HeaderInventory({ handleRefreshHeaderInventory }){

    const [productCount, setProductCount] = useState(0);
    const [productLowCount, setProductLowCount] = useState(0);
    const [damagedCount, setdamagedCount] = useState(0);
    const [disposedCount, setdisposedCount] = useState(0);


    useEffect(() => {

        getCount();
        getLowCount();
        getDamagedCount();
        getDisposedCount();
        

    }, [handleRefreshHeaderInventory] );


    function getCount() {

        // Fetch count of products
        axios.get("http://localhost:8070/products/count").then((res) => {
            setProductCount(res.data.count);
        }).catch((err) => {
            alert(err);
        });
    }

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
                <Link to={`/LowStockedList`} className="button link-button">Low Item List</Link>
                <Link to={`/DamageItemList`} className="button link-button">Damaged Items</Link>
                <Link to={`/DisposedItemList`} className="button link-button">Disposed Items</Link>
                <Link to={`/AllProducts`} className="button link-button">Manage Items</Link>
                <Link to={`/add`} className="button link-button">Add New Items</Link>

            </div>
            
            <hr/>



        </div>

    )

}