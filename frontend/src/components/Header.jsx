import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import NavBar from './NavBar'; 

const Header = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar bg-brown">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Bootstrap" height="24" />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Navbar bg="light" expand="lg">
          {/* Logo */}
          

          {/* Navbar Toggle */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar Collapse */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Nav Links */}
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/addincident">Add Incident</Nav.Link>
              <Nav.Link as={Link} to="/viewallincidents">View All Incidents</Nav.Link>
              <Nav.Link as={Link} to="/damageassessments">Damage Assessments</Nav.Link>
              <Nav.Link as={Link} to="/incidentreport">Incident Report</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
