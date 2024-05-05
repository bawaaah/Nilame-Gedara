import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import incidentImage from '../assets/in.JPG'; // Import your image file

const Home = () => {
  return (
    <div className="container">
      <h1 className="mb-4">Welcome to Incident Management System</h1>
      <Card style={{ width: '780px', margin: 'auto' }}>
        <Card.Img variant="top" src={incidentImage} alt="Incident Image" />
        <Card.Body>
          <Card.Title>Manage Incidents</Card.Title>
          <Card.Text>
            Click below to manage incidents, report new incidents, or view damage assessments.
          </Card.Text>
          <Link to="/viewallincidents" style={{marginRight: "25px"}}>
            <Button variant="primary" className="mr-3">View Incidents</Button>
          </Link>
          <Link to="/incidentreport" style={{marginRight: "25px"}}>
            <Button variant="success" className="mr-3">Report Incident</Button>
          </Link>
          <Link to="/damageassessments" style={{marginBottom: "25px"}}>
            <Button variant="info">Damage Assessments</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;