import React from 'react'
import Catalog from '../components/catalog'
import NavigationBar from '../components/NavigationBar'
import '../components/styles/cat.css'
import Footer from '../components/Footer'
import cover from '../components/images/cover.jpeg'
import cover2 from '../components/images/cover2.jpeg'



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