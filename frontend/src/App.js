import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddEmployee from './components/AddEmployee';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import DisplaySingle from './components/displaysingle';
import AllEmployees from './components/AllEmployees';
import UpdateEmployee from './components/UpadateEmployee';



function App() {
  return (
    <Router>
    <Header />
    <div class="containerApp">

      <div class="nav-container">
        <NavBar/>
      </div>

      <div class="content-container">
          <div>
            <h1> Employee Management System </h1>
            <hr className="big"/>
            
            <Routes>
              <Route path="/AddEmployee" element={<AddEmployee />} />
              <Route path="/AllEmployees" element={<AllEmployees />} />
              <Route path="/DisplaySingle/:id" element={<DisplaySingle />} />
              <Route path="/UpdateEmployee/:id" element={<UpdateEmployee />} />
              <Route path="/" element={<MainPage />} />

            </Routes>
          </div>
      </div>

    </div>
    </Router>
  );
}

export default App;
