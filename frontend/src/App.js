import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintForm from './components/ComplaintForm'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import AdminComplaintDisplay from './components/AdminComplaintDisplay';
import FeedbackDisplay from './components/FeedbackDisplay';
import GalleryForm from './components/GalleryForm';
import GalleryAdmin from './components/GalleryAdmin';
import ComplaintDisplay from './components/ComplaintDisplay';
import AdminFeedbackDisplay from './components/AdminFeedbackDisplay';



function App() {
    
    return (
        <BrowserRouter>
    <Routes>
        <Route path='/ComplaintForm' element={<ComplaintForm/>} />
        <Route path='/FeedbackForm' element={<FeedbackForm/>} />
        <Route path='/AdminComplaintDisplay' element={<AdminComplaintDisplay/>}/>
        <Route path='/FeedbackDisplay' element={<FeedbackDisplay/>}/>
        <Route path='/GalleryForm' element={<GalleryForm/>}/>
        <Route path='/GelleryAdmin' element={<GalleryAdmin/>}/>
        <Route path='/ComplaintDisplay' element={<ComplaintDisplay/>}/>
        <Route path='/AdminFeedbackDisplay' element={<AdminFeedbackDisplay
        />}/>
        

    </Routes>
    </BrowserRouter>
    );
}

export default App;
