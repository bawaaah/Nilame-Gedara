import React from 'react'
import NavBar from '../NavBar'
import SelectProduct from './selectProduct'
import Header from '../Header';

function home() {
  return (
    
              <div>
            <Header />
            <div class="containerApp">

                <div class="nav-container">
                    <NavBar />
                </div>

                <div class="content-container">
                    <div>
                        <h1> Inventory Management System </h1>
                        <hr className="big" />

                        <div><SelectProduct /></div>
                        </div>

                    </div>
                </div>

            </div>
  )
}

export default home