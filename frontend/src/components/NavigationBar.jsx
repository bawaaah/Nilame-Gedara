import React from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import logo from './images/nilameLogo.png'

const styles = {
  navBar: {
    backgroundColor: '#fcf4d9', // clean white background
    color: '#333',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Increased shadow for more depth
    borderRadius: '12px', // Increased radius for a softer look
    margin: '20px', // Adds some space around the navbar
    maxWidth: '1200px', // Maximum width of the nav bar
    marginLeft: 'auto', // Centers the navbar horizontally
    marginRight: 'auto',
  },
  navItem: {
    padding: '10px 20px',
    textDecoration: 'none',
    color: 'inherit', // Ensures text color is inherited from the parent
    fontWeight: '500',
    fontSize: '16px',
    transition: 'transform 0.3s ease, color 0.3s ease', // Adds transform to the transition
    borderRadius: '4px',
    '&:hover': { // Hover effects
      transform: 'translateY(-2px)', // Slight lift effect on hover
      color: '#0056b3', // Changes color on hover
    }
  },
  navItemActive: {
    color: '#FFFFFF', // Bright white for active link
    backgroundColor: '#007bff', // Use a primary color for the active link
  },
  rightLinks: {
    display: 'flex',
    gap: '10px', // Adds a gap between the links
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#007bff', // Logo color
  },
  logoImage: { // New style for the logo image
    height: '50px', // Example fixed height
    width: 'auto', // Width adjusts automatically maintaining aspect ratio
    display: 'block' // Ensures the image does not have extra space around it
  }
};

function NavigationBar() {
  return (
    <div style={styles.navBar}>
      <Link to="/home2" style={{ ...styles.navItem, ...styles.logo }}><img src={logo} alt='' style={styles.logoImage}/></Link>
      <div style={styles.rightLinks}>
        <NavLink to="/home2" exact style={styles.navItem} activeStyle={styles.navItemActive}>Home</NavLink>
        <NavLink to="/account" style={styles.navItem} activeStyle={styles.navItemActive}>Account</NavLink>
        <NavLink to="/complain" style={styles.navItem} activeStyle={styles.navItemActive}>Complain</NavLink>
        <NavLink to="/about-us" style={styles.navItem} activeStyle={styles.navItemActive}>About Us</NavLink>
      </div>
    </div>
  );
}

export default NavigationBar;
