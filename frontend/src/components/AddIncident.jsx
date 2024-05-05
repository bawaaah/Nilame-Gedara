import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, FormLabel, FormControl, Button, Alert, Card } from 'react-bootstrap';

const AddIncident = () => {
  const [incidentData, setIncidentData] = useState({        //state to store incident data
    category: '',
    description: '',
    location: '',
    severity: '',
    status: 'reported',
  });
  const [showAlert, setShowAlert] = useState(false); // State for showing alert
  const navigate = useNavigate();           //navigate to home page

  const handleChange = (e) => {            //Updates the incidentData state when the user types into the form inputs.
    const { name, value } = e.target;

    //validate that description and location are strings
    if ((name === "description" || name === "location") && !isNaN(value)) {
      console.error(`${name} must be a string.`);
      return;
    }
    setIncidentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {          //handle form submits
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/incidents', {       //send  POST request
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentData),
      });
      if (response.ok) {
        setShowAlert(true); // Show alert after successful submission
        setTimeout(() => {
          setShowAlert(false); // Hide alert after 3 seconds
          navigate('/');
        }, 3000);
      } else {
        throw new Error('Failed to add incident');
      }
    } catch (error) {
      console.error('Error adding incident:', error);
    }
  };

  return (
    <div style={{height: "560px"}}>
      <h2 className="mb-4">Add Incident</h2>
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
                required
              >
                <option value="">Select category</option>
                <option value="coat">coat</option>
                <option value="hat">Hat</option>
                <option value="shoes">Shoes</option>
                <option value="Nilame kit">Nilame kit</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Description:</FormLabel>
              <FormControl
                type="text"
                name="description"
                value={incidentData.description}
                onChange={handleChange}
                required
                
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Location:</FormLabel>
              <FormControl
                as="select"
                name="location"
                value={incidentData.location}
                onChange={handleChange}
                required
                >
                <option value="">Select location</option>
                <option value="Ampara">Ampara</option>
<option value="Anuradhapura">Anuradhapura</option>
<option value="Badulla">Badulla</option>
<option value="Batticaloa">Batticaloa</option>
<option value="Colombo">Colombo</option>
<option value="Galle">Galle</option>
<option value="Gampaha">Gampaha</option>
<option value="Hambantota">Hambantota</option>
<option value="Jaffna">Jaffna</option>
<option value="Kalutara">Kalutara</option>
<option value="Kandy">Kandy</option>
<option value="Kegalle">Kegalle</option>
<option value="Kilinochchi">Kilinochchi</option>
<option value="Kurunegala">Kurunegala</option>
<option value="Mannar">Mannar</option>
<option value="Matale">Matale</option>
<option value="Matara">Matara</option>
<option value="Monaragala">Monaragala</option>
<option value="Mullaitivu">Mullaitivu</option>
<option value="Nuwara Eliya">Nuwara Eliya</option>
<option value="Polonnaruwa">Polonnaruwa</option>
<option value="Puttalam">Puttalam</option>
<option value="Ratnapura">Ratnapura</option>
<option value="Trincomalee">Trincomalee</option>
<option value="Vavuniya">Vavuniya</option>

          
              </FormControl>
              
            </FormGroup>
            <FormGroup>
              <FormLabel>Severity:</FormLabel>
              <FormControl
                as="select"
                name="severity"
                value={incidentData.severity}
                onChange={handleChange}
                required
              >
                <option value="">Select severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </FormControl>
            </FormGroup>
            <Button type="submit" style={{marginTop: "25px"}}>Add Incident</Button>
          </Form>
        </Card.Body>
      </Card>
      {showAlert && (
        <Alert variant="success" className="mt-3 text-center">
          Incident added successfully. Redirecting...
        </Alert>
      )}
    </div>
  );
};

export default AddIncident;