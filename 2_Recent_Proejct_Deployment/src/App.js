import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ClovaStudio from './pages/ClovaStudio/ClovaStudio';
import LandingPageLoader from './pages/LadingPage/LandingPageLoader';
import LandingPageSettings from './pages/LadingPage/LandingPageSettings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clovastudio" element={<ClovaStudio />} />
      <Route path="/landingpagesettings" element={<LandingPageSettings />} />
      <Route path="/chatbot/landing/:id/:subId" element={<LandingPageLoader />} />
    </Routes>
  );
}

export default App;