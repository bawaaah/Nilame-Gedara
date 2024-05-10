import React from "react";
import { Link } from "react-router-dom";
import dashboard from "./images/dashboard.png";
import order from "./images/order.png";
import stockImg from "./images/stock.png";


function NavBar() {

    return (

        <ul class="nav">
            <li><a href="#"><img src={dashboard} alt="Dashboard" /> Dashboard</a></li>
            <li><Link to="/catalogManagement"><img src={dashboard} alt="Catalog Management" /> Catalog Management</Link></li>
            <li><Link to="/admin"><img src={dashboard} alt="Financial Manager" /> Financial Manager</Link></li>
            <li><Link to="/"><img src={stockImg} alt="Employee Management" /> Employee Management</Link></li>
            <li><Link to="/AllCategorys"><img src={stockImg} alt="Stock Management" /> Stock Management</Link></li>
            <li><a href="#"><img src={dashboard} alt="Supplier Management" /> Supplier Management</a></li>
            <li><a href="#"><img src={dashboard} alt="Purchasing Management" /> Purchasing Management</a></li>
        </ul>

    )
}

export default NavBar;