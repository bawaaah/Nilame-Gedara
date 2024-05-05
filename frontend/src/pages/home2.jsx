import React from 'react'
import Catalog from '../components/catalog'
import NavigationBar from '../components/NavigationBar'
import '../components/styles/cat.css'
import Footer from '../components/Footer'
import cover from '../components/images/cover.jpeg'




function home2() {
  return (
    <> 
      
      <NavigationBar />
      <div className="photo">
          <img src={cover} alt="" className='pic' />
          <img src={cover} alt="" className='pic'/>
          <img src={cover} alt="" className='pic'/>
        </div>
      <div className='cat'>
        <Catalog /> 
      </div>
      <Footer />
      </>
  )
}

export default home2