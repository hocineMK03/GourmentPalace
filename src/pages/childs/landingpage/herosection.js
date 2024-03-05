import React from 'react';
import { Parallax } from 'react-parallax';
import '../../../styles/herosection.css';
import herosectionimagedesktop from '../../../images/flat-lay-mexican-food-composition-with-copyspace.jpg'
import herosectionimagemobile from '../../../images/flat-lay-mexican-food-composition-with-copyspace-min.jpg'

import { Link } from 'react-router-dom';
const HeroSection = () => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={herosectionimagemobile}  // Add the path to your background image
      bgImageAlt="Hero Section Image"
      strength={-300}
    >
      <main className='main-hero'>
        <div className='main-intro'>
          <h1>
            Discover <br />
            a World of Delicious <span className='gradient-text'>Recipes</span>
          </h1>
          <p>Find and explore a vast collection of recipes from around the world.</p>
          <Link to="/explore">
            <button>Explore For Free!</button>
          </Link>
        </div>
      </main>
    </Parallax>
    
  );
}

export default HeroSection;
