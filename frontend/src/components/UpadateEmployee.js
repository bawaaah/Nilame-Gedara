import React, { useState, useEffect } from "react";
import axios from "axios" ;
import { useParams } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';


export default function AddEmployee() {

    const {id} = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [birth, setBirth] = useState("");
    const [contact, setContact] = useState("");
    const [nic, setNIC] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        getEmployee();
    }, []); 

    
    function getEmployee() {
        axios.get(`http://localhost:8070/employee/get/${id}`)
           .then((res) => {
                setName(res.data.user.name);
                setAddress(res.data.user.address);
                setBirth(res.data.user.birth);
                setContact(res.data.user.contact);
                setNIC(res.data.user.nic);
                setEmail(res.data.user.email);
                setGender(res.data.user.gender);
            
            }).catch((err) => {
                alert(err);
            });
        }

    function sendData(e){

        e.preventDefault();

        const newEmployee = {

            name,
            address,
            birth,
            contact,
            nic,
            email,
            gender

        }

        //if authentication we can add another parameter
        axios.put(`http://localhost:8070/employee/update/${id}`, newEmployee ).then(() => {
            alert("Employee Updated!")
        }).catch((err) => {
            alert(err)
        })

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
            
            <div className="containerFrom">

        <div class="form-container">

            <h1> Update Employee </h1>

            <hr>
            </hr>


        <form onSubmit={sendData}> 
            <div className="mb-3">
                <label for="name" >Employee Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => {

                    setName(e.target.value);

                }}/>
            </div>
            
            <div className="mb-3">
                <label for="address" >Employee Address</label>
                <input type="text" className="form-control" id="address" value={address} onChange={(e) => {

                    setAddress(e.target.value);

                }} />
            </div>

            <div className="mb-3">
                <label for="birth" >Employee Birth Day</label>
                <input type="date" className="form-control" id="birth" value={birth} onChange={(e) => {

                    setBirth(e.target.value);

                }} />
            </div>

            <div className="mb-3">
                <label for="contact" >Employee Contact</label>
                <input type="number" className="form-control" id="contact" value={contact} onChange={(e) => {

                    setContact(e.target.value);

                }} />
            </div>

            <div className="mb-3">
                <label for="nic" >Employee NIC</label>
                <input type="text" className="form-control" id="nic" value={nic} onChange={(e) => {

                    setNIC(e.target.value);

                }} />
            </div>

            <div className="mb-3">
                <label for="email" >Employee Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => {

                    setEmail(e.target.value);

                }} />
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

           
           
            <button type="submit" className="button">Update Employee</button>
        </form>

    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
        
    )
}