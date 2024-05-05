import React from 'react'
import '../components/styles/footer.css'
import fb from '../components/images/fb.png'
import insta from '../components/images/insta.png'
import twit from '../components/images/twit.png'


function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
        <h4>About Us</h4>
        <p>Providing friendly customer service while maintaining the quality and traditionality of Nilam's clothing performance.</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>281 Avissaella Rd,</p>
        <p>Pannipitiya</p>
        <p>+94 117907380</p>
        <p>+94 713491596</p>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-links">
          <img src={fb} alt="" className="logos" />
          <img src={insta} alt="" className="logos" />
          <img src={twit} alt="" className="logos" />
        </div>
      </div>
    </div>
  )
}

export default Footer