import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DiscountTable from './components/pmDiscounts';
import Amount from './components/amount';
import DiscountCalculator from './components/addDiscount';
import PayBill from './components/ProceedPay';
import PaymentTable from './components/pmPayment';
import Admin from './components/adminpg';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/discount" element={<DiscountTable />} />
          <Route path="/amount" element={<Amount />} />
          <Route path="/addDiscount" element={<DiscountCalculator />} />
          <Route path="/Pay" element={<PayBill />} />
          <Route path="/payment" element={<PaymentTable />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
