import React from 'react'
import NavBar from './NavBar'
import SelectProduct from './selectProduct'
import '../styles/home2.css'

function home() {
  return (
    <div>
      <br />
      <center><h1>Catalog Management System</h1></center>
      <div className='mid'>
        <div><NavBar /></div>
        <div><SelectProduct /></div>
      </div>
      
      </div>
  )
}

export default home