import Home2 from './pages/home2'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import SingleItem from './components/singleItem'
import Checkout from './components/Checkout'
import Update from './components/update';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home2' element={<Home2 />}></Route>
          <Route path='/SingleItem/:id' element={<SingleItem />}></Route>
          <Route path='/Checkout/:id' element={<Checkout />}></Route>
          <Route path='/update/:id' element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
