import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, FormGroup, FormLabel, FormControl, Button, Card, Alert } from 'react-bootstrap';


const UpdateIncident = () => {
  const [incidentData, setIncidentData] = useState({
    category: '',
    description: '',
    location: '',
    severity: '',
    status: '',
    inventoryCount: '', // New state for inventory count
  });
  const [showAlert, setShowAlert] = useState(false); // State for showing alert
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch incident details by ID from the server
  useEffect(() => {
    fetch(`http://localhost:3000/incidents/${id}`)
      .then((response) => response.json())
      .then((data) => setIncidentData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/incidents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incidentData),
    })
      .then(() => {
        setShowAlert(true); // Show alert after successful update
        setTimeout(() => {
          setShowAlert(false); // Hide alert after 3 seconds
          navigate('/');
        }, 3000);
      })
      .catch((error) => console.error('Error updating incident:', error));
  };

  return (
    <div style={{ height: '560px' }}>
      <h2 className="mb-4">Update Incident</h2>
      <Card style={{ width: '400px', margin: 'auto' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Category:</FormLabel>
              <FormControl
                as="select"
                name="category"
                value={incidentData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Nilame kit">Shirt</option>
                <option value="coat">Pants</option>
                <option value="hat">Dress</option>
                <option value="shoes">Dress</option>

              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Description:</FormLabel>
              <FormControl
                type="text"
                name="description"
                value={incidentData.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Location:</FormLabel>
              <FormControl
                type="text"
                name="location"
                value={incidentData.location}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Severity:</FormLabel>
              <FormControl
                as="select"
                name="severity"
                value={incidentData.severity}
                onChange={handleChange}
              >
                <option value="">Select severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Status:</FormLabel>
              <FormControl
                as="select"
                name="status"
                value={incidentData.status}
                onChange={handleChange}
              >
                <option value="reported">Reported</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </FormControl>
            </FormGroup>
            {/* Input field for inventory count */}
            <FormGroup>
              <FormLabel>Inventory Count:</FormLabel>
              <FormControl
                type="number"
                name="inventoryCount"
                value={incidentData.inventoryCount}
                onChange={handleChange}
              />
            </FormGroup>
            <Button type="submit" style={{ marginTop: '25px' }}>
              Update
            </Button>
            {showAlert && (
              <Alert variant="success" className="mt-3">
                Incident updated successfully. Redirecting...
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateIncident;