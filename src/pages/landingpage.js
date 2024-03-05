import React, { useEffect, useState, useLayoutEffect } from 'react';
import NavbarFunc from './childs/landingpage/navbar';
import HeroSection from './childs/landingpage/herosection';
import '../styles/landingpage.css';
import PrimaryFeatures from './childs/landingpage/primaryfeatures';
import MoreFeatures from './childs/landingpage/morefeatures';
import RegisterNow from './childs/landingpage/registernow';
import Footer from './childs/landingpage/footer';
import authservice from '../services/authservice';
const LandingPage = () => {
  const [heroHeight, setHeroHeight] = useState(0);
  const [isAuth,setIsAuth]=useState(false)
  useLayoutEffect(() => {
    const heroSection = document.querySelector('.main-hero');
    if (heroSection) {
      const height = heroSection.clientHeight;
      setHeroHeight(height);
    }
  }, []); // Empty dependency array to run only once after the initial render

  // Set a threshold width for dynamic adjustment
  const thresholdWidth = 1100;
  const isResponsive = window.innerWidth <= thresholdWidth;
  const checkeAuth=()=>{
    if(authservice.checkIfAuth()){
      setIsAuth(true)
    }
    else{
      setIsAuth(false)
    }
  }
  useEffect(() => {
    checkeAuth();
  });
  return (
    <div>
      <NavbarFunc isAuth={isAuth} setIsAuth={setIsAuth}/>
      <HeroSection />
      <div className="container--features" style={{ marginTop: isResponsive ? heroHeight / 2 + 20 : 0 }}>
        <PrimaryFeatures />
      </div>
      <MoreFeatures />
      <RegisterNow />
      <Footer />
    </div>
  );
};

export default LandingPage;
