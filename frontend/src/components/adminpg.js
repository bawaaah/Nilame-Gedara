import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";



function Admin() {

    return (
        <div>
        <Header/>
 
        <div class="containerApp">
            
            <div class="nav-container">
                <NavBar/>
            </div>
            <div class="content-container">
                <div className="notifySub">
                    <Link to={`/payment`} style={{ textDecoration: 'none', color: 'black' }}>Transaction Management</Link>
                </div>

                <div className="notifySubLowStocked">
                    <Link to={`/discount`} style={{ textDecoration: 'none', color: 'black' }} >Discount Management</Link>
                </div>
            </div>
        </div>
    </div>

        

    )
}

export default Admin;