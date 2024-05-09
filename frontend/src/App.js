import './App.css';
import Header from './components/Header';
import AddProduct from './components/InventoryManagement/AddProduct';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllProducts from './components/InventoryManagement/AllProducts';
import NavBar from './components/NavBar';
import EditProduct from './components/InventoryManagement/EditProduct';
import AddDamageItems from './components/InventoryManagement/AddDamageItems';
import DamageItemList from './components/InventoryManagement/DamagedItemList';
import AddDisposeItems from './components/InventoryManagement/AddDisposeItems';
import DisposedItemList from './components/InventoryManagement/DisposedItemList';
import DisplaySingle from './components/InventoryManagement/displaySingle';
import LowStockedList from './components/InventoryManagement/LowStockedList';
import AddCategory from './components/InventoryManagement/AddCategory';
import AllCategorys from './components/InventoryManagement/AllCategorys';
import CategoryWise from './components/InventoryManagement/CategoryWise';
import GenerateReports from './components/InventoryManagement/GenerateReports';

import DiscountTable from './components/PaymentManagement/pmDiscounts';
import Amount from './components/PaymentManagement/amount';
import DiscountCalculator from './components/PaymentManagement/addDiscount';
import PayBill from './components/PaymentManagement/ProceedPay';
import PaymentTable from './components/PaymentManagement/pmPayment';
import Admin from './components/PaymentManagement/adminpg';

import AddEmployee from './components/AddEmployee';
import MainPage from './components/MainPage';
import DisplaySingleEmp from './components/displaysingle';
import AllEmployees from './components/AllEmployees';
import UpdateEmployee from './components/UpadateEmployee';


function App() {
  return (
    <Router>            
            <Routes>
              /** Inventory Management System - Urindu **/
              <Route path="/add" element={<AddProduct />} />
              <Route path="/AllProducts" element={<AllProducts />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              <Route path="/AddDamageItems/:id" element={<AddDamageItems />} />
              <Route path="/DamageItemList" element={<DamageItemList />} />
              <Route path="/AddDisposeItems/:id" element={<AddDisposeItems />} />
              <Route path="/DisposedItemList/" element={<DisposedItemList />} />
              <Route path="/DisplaySingle/:id" element={<DisplaySingle />} /> 
              <Route path="/LowStockedList" element={<LowStockedList />} /> 
              <Route path="/AddCategory" element={<AddCategory />} /> 
              <Route path="/AllCategorys" element={<AllCategorys />} /> 
              <Route path="/CategoryWise/:cat" element={<CategoryWise />} /> 
              <Route path="/GenerateReports" element={<GenerateReports />} /> 

              <Route path="/discount" element={<DiscountTable />} />
              <Route path="/amount" element={<Amount />} />
              <Route path="/addDiscount" element={<DiscountCalculator />} />
              <Route path="/Pay" element={<PayBill />} />
              <Route path="/payment" element={<PaymentTable />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="/AddEmployee" element={<AddEmployee />} />
              <Route path="/AllEmployees" element={<AllEmployees />} />
              <Route path="/DisplaySingleEmp/:id" element={<DisplaySingleEmp />} />
              <Route path="/UpdateEmployee/:id" element={<UpdateEmployee />} />
              <Route path="/" element={<MainPage />} />

            </Routes>
    </Router>
  );
}

export default App;
