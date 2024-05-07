import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import NavBar from "./NavBar";
import Header from "./Header";
import logo from '../images/nilameLogo.png';

const AddDiscountForm = ({ onDiscountAdded }) => {
  const [formData, setFormData] = useState({
    discountcode: '',
    discountpercentage: '',
    employeeid: '',
    points: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/discount', formData);
      const newDiscount = response.data;
      onDiscountAdded(newDiscount);
      setFormData({
        discountcode: '',
        discountpercentage: '',
        employeeid: '',
        points: '',
      });
    } catch (error) {
      console.error('Error creating discount:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Discount</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Discount Code:
            <input
              type="text"
              className="form-control"
              name="discountcode"
              value={formData.discountcode}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Discount Percentage:
            <input
              type="number"
              className="form-control"
              name="discountpercentage"
              value={formData.discountpercentage}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Employee ID:
            <input
              type="text"
              className="form-control"
              name="employeeid"
              value={formData.employeeid}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Points:
            <input
              type="text"
              className="form-control"
              name="points"
              value={formData.points}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Discount
        </button>
      </form>
    </div>
  );
};

const DiscountTable = () => {
  const [discounts, setDiscounts] = useState([]);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchDiscountCode, setSearchDiscountCode] = useState('');

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get('http://localhost:8070/discount');
        setDiscounts(response.data);
      } catch (error) {
        console.error('Error fetching discounts:', error.response?.data || error.message);
      }
    };

    fetchDiscounts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8070/discount/${id}`);
      if (response.status === 200) {
        setDiscounts((prevDiscounts) => prevDiscounts.filter((d) => d._id !== id));
      }
    } catch (error) {
      console.error('Error deleting discount:', error.response?.data || error.message);
    }
  };

  const handleEdit = (id) => {
    const discountToUpdate = discounts.find((d) => d._id == id);
    setEditingDiscount(discountToUpdate);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8070/discount/${editingDiscount._id}`,
        editingDiscount
      );
      const updatedDiscount = response.data;

      setDiscounts((prevDiscounts) => {
        const updatedList = prevDiscounts.map((d) => (d._id === updatedDiscount._id ? updatedDiscount : d));
        return updatedList;
      });

      setEditingDiscount(null);
    } catch (error) {
      console.error('Error updating discount:', error.response?.data || error.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingDiscount((prevDiscount) => ({
      ...prevDiscount,
      [name]: value,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(logo, 'PNG', 10, 10, 20, 20); // Adjust position and size
  
    // Add the title
    doc.setFontSize(16);
    doc.text('Nilame Gedara Discount Code Summary', 40, 20); // Position text after the logo
  
    // Add the generated date
    const generatedDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    doc.setFontSize(10);
    doc.text(`Generated on: ${generatedDate}`, 40, 30);

    const tableColumn = ['Discount Code', 'Discount Percentage', 'Employee ID', 'Points'];
    const tableRows = [];

    discounts
      .filter((discount) => discount.discountcode.toLowerCase().includes(searchDiscountCode.toLowerCase()))
      .forEach((discount) => {
        const discountData = [
          discount.discountcode,
          `${discount.discountpercentage}%`,
          discount.employeeid,
          discount.points,
        ];
        tableRows.push(discountData);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40, // Start after the header
      });

    doc.save('Filtered_Discounts.pdf');
  };

  return (
    <div>
        <Header/>
 
        <div class="containerApp">
            
            <div class="nav-container">
                <NavBar/>
            </div>
            <div class="content-container">

            <div className="container mt-4">
    <h2>Discounts Table</h2>

    <div className="mb-3"> 
      <label className="form-label"> 
        Search by Discount Code:
        <input
          type="text"
          className="form-control" 
          value={searchDiscountCode}
          onChange={(e) => setSearchDiscountCode(e.target.value)}
        />
      </label>
      <button className="btn btn-primary me-2" onClick={generatePDF}> 
        Generate PDF
      </button>
    </div>

    <Table striped bordered hover> 
      <thead>
        <tr>
          <th>Discount Code</th>
          <th>Discount Percentage</th>
          <th>Employee ID</th>
          <th>Points</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {discounts
          .filter((discount) => discount.discountcode.toLowerCase().includes(searchDiscountCode.toLowerCase()))
          .map((discount) => (
            <tr key={discount._id}>
              <td>{discount.discountcode}</td>
              <td>{`${discount.discountpercentage}%`}</td>
              <td>{discount.employeeid}</td>
              <td>{discount.points}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(discount._id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(discount._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>

    {editingDiscount && (
      <div className="mt-3">
        <h3>Edit Discount</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <label className="form-label">
            Discount Code:
            <input
              type="text"
              className="form-control"
              name="discountcode"
              value={editingDiscount.discountcode}
              onChange={handleEditChange}
            />
          </label>
          <label className="form-label">
            Discount Percentage:
            <input
              type="number"
              className="form-control"
              name="discountpercentage"
              value={editingDiscount.discountpercentage}
              onChange={handleEditChange}
            />
          </label>
          <label className="form-label">
            Employee ID:
            <input
              type="text"
              className="form-control"
              name="employeeid"
              value={editingDiscount.employeeid}
              onChange={handleEditChange}
            />
          </label>
          <label className="form-label">
            Points:
            <input
              type="text"
              className="form-control"
              name="points"
              value={editingDiscount.points}
              onChange={handleEditChange}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    )}

    <button
      className="btn btn-secondary mt-3" 
      onClick={() => setShowAddForm((prev) => !prev)}
    >
      {showAddForm ? 'Hide Add Discount' : 'Show Add Discount'}
    </button>

    {showAddForm && (
      <AddDiscountForm
        onDiscountAdded={(newDiscount) => {
          setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
          setShowAddForm(false);
        }}
      />
    )}
  </div>
                
            </div>
        </div>
    </div>

    

  );
};

export default DiscountTable;
