import React, { useState } from "react";
import axios from "axios";
import Header from './Header';
import NavBar from './NavBar';
import './styles/addEmp.css';


function AddEmployee() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [birth, setBirth] = useState("");
    const [contact, setContact] = useState("");
    const [nic, setNIC] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

    function sendData(e) {
        e.preventDefault();

        if (contact.length !== 10) {
            alert("Please enter a valid contact number with 10 digits.");
            return;
        }

        // Validate birth year
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(birth).getFullYear();
        if (birthYear >= 2025 || birthYear >= currentYear) {
            alert("Invalid birth year. Birth year should be less than 2025.");
            return;
        }

        const newEmployee = {
            name,
            address,
            birth,
            contact,
            nic,
            email,
            gender
        };

        axios.post("http://localhost:8070/employee/add", newEmployee)
            .then(() => {
                alert("Employee Added");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div>
            <Header />
    <div className="containerApp">

      <div className="nav-container">
        <NavBar/>
      </div>

      <div className="content-container">
          <div>
            <h1> Employee Management System </h1>
            <hr className="big"/>
            
            <div className="form-container">
            <form onSubmit={sendData}>
                <h1>Add Employee</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Employee Name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter Employee Address"
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="birth" className="form-label">Birth Day</label>
                    <input type="date" className="form-control" id="birth"
                        onChange={(e) => setBirth(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact</label>
                    <input type="number" className="form-control" id="contact" placeholder="Enter Employee Contact Number"
                        onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="NIC" className="form-label">NIC</label>
                    <input type="text" className="form-control" id="nic" placeholder="Enter Employee NIC"
                        onChange={(e) => setNIC(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Employee Email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                        <label>
                            <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
                            Male
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} />
                            Female
                        </label>
                    </div>
                </div>
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
          </div>
      </div>
    </div>
    </div>
        
    );
}

export default AddEmployee;
