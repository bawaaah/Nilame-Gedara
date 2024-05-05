import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewAllIncidents from './components/ViewAllIncidents';
import AddIncident from './components/AddIncident';
import ViewIncident from './components/ViewIncident'; // Corrected import
import UpdateIncident from './components/UpdateIncident';
import Header from './components/Header';
import Footer from './components/Footer';
import DamageAssessments from './components/DamageAssessments';
import IncidentReport from './components/IncidentReport';
import Home from './components/Home';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/viewallincidents" element={<ViewAllIncidents />} />
          <Route exact path="/addincident" element={<AddIncident />} />
          <Route exact path="/viewincident/:id" element={<ViewIncident />} />
          <Route exact path="/updateincident/:id" element={<UpdateIncident />} />
          <Route exact path="/damageassessments" element={<DamageAssessments />} />
          <Route exact path="/incidentreport" element={<IncidentReport />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;