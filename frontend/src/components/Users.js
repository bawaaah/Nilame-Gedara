import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from '../styles/Username.module.css';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('User Profiles', 14, 20);
  
    const tableData = filteredUsers.map((user, index) => [
      index + 1, // Auto-incrementing number
      user.username.split(' ')[0],
      user.username.split(' ')[1],
      user.email,
      user.phone || '-',
    ]);
    doc.autoTable({
      head: [['#', 'First Name', 'Last Name', 'Email', 'Phone Number']],
      body: tableData,
      startY: 30,
    });
  
    doc.save('user_profiles.pdf');
  };

  const handleClick = async (id,event) => {

    event.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:8070/api/deleteAnUser/${id}`);

    if (response.status === 200) {
      
      //update the states after user is deleted
      users.filter((user) => user._id !== id);
      setUsers(users.filter((user) => user._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'User deleted successfully',
        showConfirmButton: false,
        timer: 1500
      });
    }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error occured!',
        text: 'Something went wrong!',
      });
    }
    
  }
  

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.username}`.toLowerCase();
    const email = user.email.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    return fullName.includes(searchTermLower) || email.includes(searchTermLower);
  });

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4 max-w-sm">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-crimson"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-3 text-left text-sm uppercase font-semibold">#</th>
              <th className="px-6 py-3 text-left text-sm uppercase font-semibold">First Name</th>
              <th className="px-6 py-3 text-left text-sm uppercase font-semibold">Last Name</th>
              <th className="px-6 py-3 text-left text-sm uppercase font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm uppercase font-semibold">Phone</th>
              <th className="px-6 py-3 text-left text-sm uppercase font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.username.split(' ')[0]}</td>
                <td className="px-6 py-4">{user.username.split(' ')[1]}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone || '-'}</td>
                <td className=""><button className={styles.btn3} onClick={(event) => handleClick(user._id, event)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary rounded-pill px-3 py-2 text-sm transition duration-300 ease-in-out transform hover:scale-105"
          onClick={generatePDF}
          style={{ backgroundColor: '#98454f', borderColor: '#98454f', marginLeft: '10px' }}
        >
          Generate PDF
        </button>
      </div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedUser ? selectedUser.username : null}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <p><strong>First Name:</strong> {selectedUser.username.split(' ')[0]}</p>
              <p><strong>Last Name:</strong> {selectedUser.username.split(' ')[1]}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone || '-'}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
