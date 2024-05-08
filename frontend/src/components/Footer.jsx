import React from 'react'
import '../components/styles/footer.css'
import fb from './images/fb.png'
import insta from './images/insta.png'
import twit from './images/twit.png'


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
          <a href="https://web.facebook.com/nilamegedara/?_rdc=1&_rdr"><img src={fb} alt="" className="logos" /></a>
          <a href="https://www.instagram.com/nilamegedara/"><img src={insta} alt="" className="logos" /></a>
          <a href=""></a>
          <img src={twit} alt="" className="logos" />
        </div>
      </div>
    </div>
  )
}

export default Footer