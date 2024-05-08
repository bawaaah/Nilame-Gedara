import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Example table component
import { CSVLink } from 'react-csv'; // For exporting data to CSV
import jsPDF from 'jspdf'; // For generating PDFs
import 'jspdf-autotable';
import Header from '../Header';
import Navbar from '../NavBar';
import moment from 'moment';
import logo from '../images/nilameLogo.png';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [searchUserId, setSearchUserId] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const formatDate = (dateString) => {
    return moment(dateString).format('DD/MM/YYYY'); // Format to day/month/year hour:minute
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8070/payment/');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []); // Only fetches once when the component mounts

  // Filter payments based on search criteria
  const filteredPayments = payments.filter((payment) => {
    const userIdMatch = searchUserId === '' || payment.userId.includes(searchUserId);
    const dateMatch =
      (filterStartDate === '' || new Date(payment.Date) >= new Date(filterStartDate)) &&
      (filterEndDate === '' ||  new Date(payment.Date) <= new Date(filterEndDate));
    return userIdMatch && dateMatch;
  });

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add the logo to the PDF header
    doc.addImage(logo, 'PNG', 10, 10, 20, 20); // Adjust position and size
  
    // Add the title
    doc.setFontSize(16);
    doc.text('Nilame Gedara Payment Summary', 40, 20); // Position text after the logo
  
    // Add the generated date
    const generatedDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    doc.setFontSize(10);
    doc.text(`Generated on: ${generatedDate}`, 40, 30);
  
    // Create the table
    const tableColumn = ['Order ID', 'User ID', 'Date', 'Item ID', 'Amount'];
    const tableRows = [];

    filteredPayments.forEach((payment) => {
      const paymentData = [
        payment.orderId,
        payment.userId,
        new Date(payment.Date).toLocaleDateString(), // Format date for display
        payment.itemId,
        payment.amount.toFixed(2),
      ];
      tableRows.push(paymentData);
    });
  
    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40, // Start after the header
    });
  
    doc.save('Payment_Details.pdf');
  };
  return (
    <div>
        <Header/>
 
        <div class="containerApp">
            
            <div class="nav-container">
                <Navbar/>
            </div>
            <div class="content-container">
            <div className="container mt-4">
      <h2>Payment Table</h2>
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-4">
          Search by User ID:
          <input
            type="text"
            className="form-control"
            style={{ height: '38px' }}  // Ensure consistent height
            value={searchUserId}
            onChange={(e) => setSearchUserId(e.target.value)}
          />
        </label>

        <label className="form-label me-4">
          Filter by Start Date:
          <input
            type="date"
            className="form-control"
            style={{ height: '38px' }}  // Ensure consistent height
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
          />
        </label>

        <label className="form-label me-4">
          Filter by End Date:
          <input
            type="date"
            className="form-control"
            style={{ height: '38px' }}  // Ensure consistent height
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
          />
        </label>

        <button className="btn btn-primary me-4" onClick={generatePDF}>
          Generate PDF
        </button>

        <CSVLink
          data={filteredPayments}
          filename="Payment_Details.csv"
          className="btn btn-secondary"
        >
          Export to CSV
        </CSVLink>
      </div>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Item ID</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.orderId}</td>
              <td>{payment.userId}</td>
              <td>{formatDate(payment.Date)}</td>
              <td>{payment.itemId}</td>
              <td>{payment.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

        </div>
    </div>
    </div>
      
  );
};

export default PaymentTable;
