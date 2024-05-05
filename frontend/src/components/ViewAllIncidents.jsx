import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, FormControl, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap

const ViewAllIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false); // State for controlling alert visibility

  // Fetch all incidents from the server
  useEffect(() => {
    fetch('http://localhost:3000/incidents')
      .then((response) => response.json())
      .then((data) => setIncidents(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/incidents/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Show alert after successful deletion
        setShowAlert(true);

        // Reload the incidents after deletion
        fetch('http://localhost:3000/incidents')
          .then((response) => response.json())
          .then((data) => setIncidents(data))
          .catch((error) => console.error('Error fetching data:', error));
      } else {
        throw new Error('Failed to delete incident');
      }
    } catch (error) {
      console.error('Error deleting incident:', error);
    }
  };

  // Filter incidents based on the search query
  const filteredIncidents = incidents.filter((incident) =>
    incident.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ height: '560px' }}>
      <h2>All Incidents</h2>
      <Form inline className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-sm-2"
        />
      </Form>
      {showAlert && ( // Render the alert if showAlert is true
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Incident deleted successfully!
        </Alert>
      )}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.map((incident) => (
            <tr key={incident._id}>
              <td>{incident.category}</td>
              <td>{incident.description}</td>
              <td>{incident.location}</td>
              <td>
                <Link
                  to={`/viewincident/${incident._id}`}
                  className="btn btn-info btn-sm mr-1"
                  style={{ marginRight: '25px' }}
                >
                  View
                </Link>
                <Link
                  to={`/updateincident/${incident._id}`}
                  className="btn btn-warning btn-sm mr-1"
                  style={{ marginRight: '25px' }}
                >
                  Update
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(incident._id)}
                  style={{ marginRight: '25px' }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAllIncidents;