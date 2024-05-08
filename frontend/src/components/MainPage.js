import React from "react";


function MainPage(){

    const handleAddEmployeeClick = () => {
        window.location.href = "/AddEmployee";
      };
      
    const handleViewEmployeeClick = () => {
        window.location.href = "/AllEmployees";
      };
    
    return(
    <ul class="/">
       <button className="button button-delete" onClick={handleAddEmployeeClick}>
        Add Employee
      </button>
      <button className="button button-delete" onClick={handleViewEmployeeClick}>
        View Employee
      </button>
    </ul>
    )



}
export default MainPage;