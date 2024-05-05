// DamageAssessments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import SearchBar from './searchbar';

const DamageAssessments = () => {
  const [damageAssessments, setDamageAssessments] = useState([]);
  const [filteredDamageAssessments, setFilteredDamageAssessments] = useState([]);

  useEffect(() => {
    fetchDamageAssessments();
  }, []);

  const fetchDamageAssessments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/incidents');
      setDamageAssessments(response.data);
      setFilteredDamageAssessments(response.data);
    } catch (error) {
      console.error('Error fetching damage assessments:', error);
    }
  };

  const calculatePenalties = (damage) => {
    let penalties;

    switch (damage.category) {
      case 'Nilame kit':
        switch (damage.severity) {
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
        switch (damage.severity) {
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
        switch (damage.severity) {
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
        switch (damage.severity) {
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
        switch (damage.severity) {
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

  const handleSearch = (term) => {
    const filtered = damageAssessments.filter((damage) =>
    damage.category.toLowerCase().includes(term.toLowerCase()) ||
    damage.description.toLowerCase().includes(term.toLowerCase()) ||
    damage.location.toLowerCase().includes(term.toLowerCase()) ||
    damage.severity.toLowerCase().includes(term.toLowerCase()) ||
    damage.status.toLowerCase().includes(term.toLowerCase()) ||
    new Date(damage.date).toLocaleDateString().includes(term.toLowerCase())
    );
    setFilteredDamageAssessments(filtered);
  };

  return (
    <div style={{ height: '560px' }}>
      <h1 className="mb-4">Damage Assessments</h1>
      <SearchBar onChange={handleSearch} />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Location</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Date</th>
            <th>Penalties</th>
            <th>Inventory Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredDamageAssessments.map((damage) => (
            <tr key={damage._id}>
              <td>{damage.category}</td>
              <td>{damage.description}</td>
              <td>{damage.location}</td>
              <td>{damage.severity}</td>
              <td>{damage.status}</td>
              <td>{new Date(damage.date).toLocaleDateString()}</td>
              <td>{calculatePenalties(damage)}</td>
              <td>{damage.inventoryCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DamageAssessments;
