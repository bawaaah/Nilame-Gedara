import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddEmployee from './components/AddEmployee';
import MainPage from './components/MainPage';
import DisplaySingle from './components/displaysingle';
import AllEmployees from './components/AllEmployees';
import UpdateEmployee from './components/UpadateEmployee';



function App() {
  return (
    <Router>
  
      <div class="content-container">
          <div>
          
            <Routes>
              <Route path="/AddEmployee" element={<AddEmployee />} />
              <Route path="/AllEmployees" element={<AllEmployees />} />
              <Route path="/DisplaySingle/:id" element={<DisplaySingle />} />
              <Route path="/UpdateEmployee/:id" element={<UpdateEmployee />} />
              <Route path="/" element={<MainPage />} />

            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
