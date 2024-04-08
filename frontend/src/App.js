import './App.css';
import Header from './components/Header';
import AddProduct from './components/AddProduct';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllProducts from './components/AllProducts';
import NavBar from './components/NavBar';
import EditProduct from './components/EditProduct';
import AddDamageItems from './components/AddDamageItems';
import DamageItemList from './components/DamagedItemList';
import AddDisposeItems from './components/AddDisposeItems';
import DisposedItemList from './components/DisposedItemList';
import DisplaySingle from './components/displaySingle';
import LowStockedList from './components/LowStockedList';
import AddCategory from './components/AddCategory';
import AllCategorys from './components/AllCategorys';
import CategoryWise from './components/CategoryWise';
import GenerateReports from './components/GenerateReports';

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
            <h1> Inventory Management System </h1>
            <hr className="big"/>
            
            <Routes>
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
              <Route path="/" element={<AllCategorys />} /> 
              <Route path="/CategoryWise/:cat" element={<CategoryWise />} /> 
              <Route path="/GenerateReports" element={<GenerateReports />} /> 






            </Routes>
          </div>
      </div>

    </div>
    </Router>
  );
}

export default App;
