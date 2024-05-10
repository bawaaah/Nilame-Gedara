import React from "react";
import Header from './Header';
import NavBar from './NavBar';

function MainPage(){

    const handleAddEmployeeClick = () => {
        window.location.href = "/AddEmployee";
      };
      
    const handleViewEmployeeClick = () => {
        window.location.href = "/AllEmployees";
      };
    
    return(
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
            
            </div>
    <ul class="/">
       <button className="button button-delete" onClick={handleAddEmployeeClick}>
        Add Employee
      </button>
      <button className="button button-delete" onClick={handleViewEmployeeClick}>
        View Employee
      </button>
    </ul>
          </div>
      </div>

    </div>
    
    )



}
export default MainPage;