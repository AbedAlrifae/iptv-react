import { useState } from 'react'
import React, { useEffect } from 'react';
import ScrollToTop from './javascript/ScrollToTop';
import DesktopHeader from './components/headers/DesktopHeader';
import BurgerMenu from './components/headers/BurgerMenu';
import IPTVPlayer from "./components/IPTVPlayer";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Footer from './components/footer/Footer'
const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
      const checkScreenSize = () => {
          setIsMobile(window.innerWidth <= 800);
      };

      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);

      return () => {
          window.removeEventListener('resize', checkScreenSize);
      };
  }, []);

  useEffect(() => {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 500); // Simuleer laadtijd van 500ms
      return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
    <ScrollToTop/>
       
        {(isMobile ? <BurgerMenu /> : <DesktopHeader />)}
<Routes>
<Route path="*" element={<NotFound />} />
<Route path='/' element= {<IPTVPlayer/>} />

</Routes>

        <Footer />
        
    </>
  );
};

const AppWithRouter = () => (
  <Router>
      <App />
  </Router>
);
export default AppWithRouter
