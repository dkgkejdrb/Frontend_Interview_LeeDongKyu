import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import W2LcmsPractice2 from './pages/w2/LcmsPractice2';
import W3LandingPageSettings from './pages/w3/LcmsLandingPageSetting';
import W3LandingPageSettingsAuth from './pages/w3/LcmsLandingPageSettingsAuth';
import LandingDetail from './pages/w3/LandingDetail';
import LcmsLandingPageList from "./pages/w3/LcmsLandingPageList";
import LcmsLandingPageListAuth from './pages/w3/LcmsLandingPageListAuth';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/w2/lcmsPractice2" element={<W2LcmsPractice2 />} />
      <Route path="/w3/lcmsLandingPageSettings" element={<W3LandingPageSettings /> } />
      <Route path="/w3/lcmsLandingPageSettingsAuth" element={<W3LandingPageSettingsAuth />}/>

      <Route path="/chatbot/landing/:id/:subId" element={<LandingDetail /> } />
      <Route path="/w3/lcmsLandingPageList" element={<LcmsLandingPageList /> } />
      <Route path="/w3/lcmsLandingPageListAuth" element={<LcmsLandingPageListAuth /> } />
    </Routes>
  );
}

export default App;