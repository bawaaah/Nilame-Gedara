import './App.css';
import AddProduct from './components/InventoryManagement/AddProduct';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllProducts from './components/InventoryManagement/AllProducts';

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

import Home2 from './components/OrderManagement/home2'
import Home from './components/CatalogManagement/home'
import SingleItem from './components/OrderManagement/singleItem'
import Checkout from './components/OrderManagement/Checkout'
import Update from './components/OrderManagement/update';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

/*import all components*/
import Login from './components/Login' ;
import Register from './components/Register';
import Reset from './components/Reset';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import Users from './components/Users';
import Email from './components/Email';

/**auth middleware */
import { AuthorizeUser } from './middleware/auth'

const router = createBrowserRouter([
  {
    path : '/login',
    element : <Login></Login>
  },
  {
    path : '/register',
    element : <Register></Register>
  },
  {
    path : '/profile',
    element : <AuthorizeUser> <Profile></Profile></AuthorizeUser>
  },
  {
    path : '/reset/:token',
    element : <Reset></Reset>
  },
  {
    path : '*',
    element : <PageNotFound></PageNotFound>
  },
  {
    path : '/',
    element : <Home></Home>
  },
  {
    path : '/users',
    element : <Users></Users>
  },
  {
    path : '/email',
    element : <Email></Email>
  }
])

function App() {
  return (
    
    <Router> 
      <RouterProvider router={router}></RouterProvider>           
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

              <Route path='/catalogManagement' element={<Home />}></Route>
              <Route path='/home' element={<Home2 />}></Route>
              <Route path='/SingleItem/:id' element={<SingleItem />}></Route>
              <Route path='/Checkout/:id' element={<Checkout />}></Route>
              <Route path='/update/:id' element={<Update />}></Route>

            </Routes>
    </Router>
  );
}

export default App;
