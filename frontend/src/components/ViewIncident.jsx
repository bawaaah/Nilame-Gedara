import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import incidentImage from '../assets/image.jpeg'; // Import the image file correctly
import { Card, Col, Container, Row } from 'react-bootstrap'; // Import Card, Col, Container, and Row components from react-bootstrap
import './ViewIncident.css'; // Import custom CSS for additional styling

const ViewIncident = () => {
  const [incident, setIncident] = useState(null);
  const { id } = useParams();

  // Fetch incident details by ID from the server
  useEffect(() => {
    fetch(`http://localhost:3000/incidents/${id}`)
      .then((response) => response.json())
      .then((data) => setIncident(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (!incident) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="view-incident-container" style={{marginBottom: "170px"}}>
      <h2 className="mb-4">Incident Details</h2>
      <Row className="justify-content-center align-items-center h-100">
        <Col md={6}>
          <Card className="incident-card">
            <Card.Img variant="top" src={incidentImage} alt="Incident" className="incident-img" />
            <Card.Body>
              <Card.Title className="incident-title">{incident.category}</Card.Title>
              <Card.Text>
                <p className="incident-description">Description: {incident.description}</p>
                <p className="incident-info">Location: {incident.location}</p>
                <p className="incident-info">Severity: {incident.severity}</p>
                <p className="incident-info">Status: {incident.status}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewIncident;