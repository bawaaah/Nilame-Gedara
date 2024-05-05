import React, { useState } from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import order from "../assets/order.png";
import stockImg from "../assets/stock.png";
import "./NavBar.css";

function NavBar() {
  const [sideNavWidth, setSideNavWidth] = useState(0);

  const openNav = () => {
    setSideNavWidth(250);
  };

  const closeNav = () => {
    setSideNavWidth(0);
  };

  return (
    <div>
      <span
        style={{ fontSize: "30px", cursor: "pointer", position: "absolute", left: "10px", top: "10px" }}
        onClick={openNav}
      >
        &#9776; Open
      </span>
      <ul className="nav" style={{ width: sideNavWidth }}>
        <button className="closebtn" onClick={closeNav}>
          &times;
        </button>
        <li>
          <Link to="#">
            <img src={dashboard} alt="Dashboard" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={order} alt="Order Management" /> Order Management
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={dashboard} alt="Financial Manager" /> Financial Manager
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={dashboard} alt="Employee Management" /> Employee Management
          </Link>
        </li>
        <li>
          <Link to="/">
            <img src={stockImg} alt="Stock Management" /> Stock Management
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={dashboard} alt="Supplier Management" /> Supplier Management
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={dashboard} alt="Purchasing Management" /> Purchasing Management
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={dashboard} alt="Damage and loss Management" /> Incident Management
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
