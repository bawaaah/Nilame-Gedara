import Home2 from './components/OrderManagement/home2'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/CatalogManagement/home'
import SingleItem from './components/OrderManagement/singleItem'
import Checkout from './components/OrderManagement/Checkout'
import Update from './components/OrderManagement/update';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/catalogManagement' element={<Home />}></Route>
          <Route path='/home' element={<Home2 />}></Route>
          <Route path='/SingleItem/:id' element={<SingleItem />}></Route>
          <Route path='/Checkout/:id' element={<Checkout />}></Route>
          <Route path='/update/:id' element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
