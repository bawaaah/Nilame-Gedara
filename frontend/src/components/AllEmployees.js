import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles/AllEmployees.css'
import Header from './Header';
import NavBar from './NavBar';

function AllEmployees() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        function getEmployees() {
            axios.get("http://localhost:8070/employee/")
                .then((res) => {
                    setEmployees(res.data);
                }).catch((err) => {
                    alert(err.message);
                })
        }
        getEmployees();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const results = employees.filter((employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, employees]);

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
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Birth Day</th>
                        <th>Contact</th>
                        <th>NIC</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.address}</td>
                            <td>{employee.birth}</td>
                            <td>{employee.contact}</td>
                            <td>{employee.nic}</td>
                            <td>{employee.email}</td>
                            <td>{employee.gender}</td>
                            <td>
                                <Link to={`/DisplaySingle/${employee._id}`} className="button">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </div>
        </div>
        </div>
        
    )
}

export default AllEmployees;
