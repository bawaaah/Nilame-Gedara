import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import './styles/displaySingle.css';
import logo from "./images/nilameLogo.png";
import Header from './Header';
import NavBar from './NavBar';


export default function DisplaySingle() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        getEmployee();
    }, []);

    function getEmployee() {
        axios.get(`http://localhost:8070/employee/get/${id}`)
            .then((res) => {
                setEmployee(res.data.user);
            }).catch((err) => {
                console.error(err);
            });
    }

    function deleteEmployee(userId) {
        axios.delete(`http://localhost:8070/employee/delete/${userId}`)
            .then(() => {
                alert("Employee deleted successfully");
            })
            .catch((err) => {
                alert("Error deleting employee " + err.message);
                console.error(err);
            });
    };

    function generatePDF() {
        const doc = new jsPDF();
        const imgData = logo; // Use the imported logo image
        doc.addImage(imgData, 'JPEG', 10, 5, 40, 40); // Adjust the coordinates and dimensions as needed
        doc.text("Employee Details", 60, 20); // Adjust the position as needed
        let yPos = 70; // Adjust the starting Y position as needed

        Object.entries(employee).forEach(([key, value]) => {
            doc.text(`${key}: ${value}`, 10, yPos);
            yPos += 10;
        });

        doc.save("employee_report.pdf");
    }

    return (
        <div>
<Header />
    <div class="containerApp">

      <div class="nav-container">
        <NavBar/>
      </div>

      <div class="content-container">
          <div>
            <h1> Employee Management System </h1>
            <hr className="big"/>
            <div className="container">
            <div className="product-details">
                <div className="detailss">
                    <div className="detail">
                        <label>Name:</label>
                        <span>{employee.name}</span>
                    </div>
                    <div className="detail">
                        <label>Address:</label>
                        <span>{employee.address}</span>
                    </div>
                    <div className="detail">
                        <label>Birth Day:</label>
                        <span>{employee.birth}</span>
                    </div>
                    <div className="detail">
                        <label>Contact Number:</label>
                        <span>{employee.contact}</span>
                    </div>
                    <div className="detail">
                        <label>NIC:</label>
                        <span>{employee.nic ? 'Available' : 'Not Available'}</span>
                    </div>
                    <div className="detail">
                        <label>Email:</label>
                        <span>{employee.email}</span>
                    </div>

                    <div className="button-container">
                        <Link to={`/UpdateEmployee/${employee._id}`} className="button link-button update">Update</Link>
                        <button className="button button-delete" onClick={() => deleteEmployee(employee._id)}>Delete</button>
                        <button className="button button-report" onClick={generatePDF}>Report</button>
                    </div>
                </div>
            </div>
        </div>
            
            
          </div>
      </div>

    </div>
</div>
        
    );
}
