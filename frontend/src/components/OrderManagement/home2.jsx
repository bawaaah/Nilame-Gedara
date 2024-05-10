import React from 'react'
import Catalog from './catalog'
import NavigationBar from './NavigationBar'
import '../styles/cat.css'
import Footer from './Footer'
import cover from '../images/cover.jpeg'
import cover2 from '../images/cover2.jpeg'

function home2() {
  return (
    <> 
      
      <NavigationBar />
      <div className="photo-container">
        <div className="photo-wrapper">
          <img src={cover} alt="" />
          <img src={cover2} alt="" />
          <img src={cover} alt="" />
          <img src={cover2} alt="" />
        </div>
        </div>
        <br />
      <div className='cat'>
        <Catalog /> 
      </div>
      <Footer />
      </>
  )
}

export default home2