import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import AddEmployee from './components/AddEmployee';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import AllEmployees from './components/AllEmployees';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <AllEmployees/>
        <MainPage/>
        <div>
          <div class="nav-container">
            <NavBar />
          </div>
            <div class="form-container">
            <Routes>

              <Route path="/AddEmployee" element={<AddEmployee />} />
            </Routes>

            </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
