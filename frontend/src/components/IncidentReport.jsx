import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const IncidentReport = () => {
  const [incidents, setIncidents] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/incidents');
        setIncidents(response.data);
      } catch (error) {
        console.error('Error fetching incidents:', error.message);
        // add code to show an error message to the user
      }
    };
    fetchIncidents();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const calculatePenalties = (incident) => {
    let penalties;

    switch (incident.category) {
      
        case 'Nilame kit':
          switch (incident.severity) {
            case 'high':
              penalties = 200;
              break;
            case 'medium':
              penalties = 120;
              break;
            case 'low':
              penalties = 80;
              break;
            default:
              penalties = 0;
              break;
          }
          break;
        case 'coat':
          switch (incident.severity) {
            case 'high':
              penalties = 150;
              break;
            case 'medium':
              penalties = 90;
              break;
            case 'low':
              penalties = 60;
              break;
            default:
              penalties = 0;
              break;
          }
          break;
        case 'hat':
          switch (incident.severity) {
            case 'high':
              penalties = 180;
              break;
            case 'medium':
              penalties = 110;
              break;
            case 'low':
              penalties = 70;
              break;
            default:
              penalties = 0;
              break;
          }
          break;
          case 'shoes':
            switch (incident.severity) {
              case 'high':
                penalties = 100;
                break;
              case 'medium':
                penalties = 90;
                break;
              case 'low':
                penalties = 70;
                break;
              default:
                penalties = 0;
                break;
            }
          break;
        default:
          switch (incident.severity) {
            case 'high':
              penalties = 100;
              break;
            case 'medium':
              penalties = 60;
              break;
            case 'low':
              penalties = 40;
              break;
            default:
              penalties = 0;
              break;
          }
          break;
      }
  
      
  
    console.log('Penalties:', penalties);
    return penalties;
  };

  return (
    <Container style={{ marginBottom: '50px', marginTop: '25px', height: "560px" }}>
      <h2 className="mb-4">Incident Report</h2>
      <div ref={componentRef}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Inventory Count</th>
              <th>Penalties</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident._id}>
                <td>{incident.category}</td>
                <td>{incident.description}</td>
                <td>{new Date(incident.date).toLocaleDateString()}</td>
                <td>{incident.location}</td>
                <td>{incident.severity}</td>
                <td>{incident.status}</td>
                <td>{incident.inventoryCount}</td>
                <td>{calculatePenalties(incident)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" onClick={handlePrint}>
          Download as PDF
        </Button>
      </div>
    </Container>
  );
};

export default IncidentReport;