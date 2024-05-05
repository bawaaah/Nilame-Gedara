import React from 'react'
import NavBar from '../components/NavBar'
import SelectProduct from '../components/selectProduct'
import '../components/styles/home2.css'

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