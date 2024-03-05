import React from 'react';
import { Parallax } from 'react-parallax';
import image1 from '../../../images/moref1.jpg';
import image2 from '../../../images/moref2.png';
import '../../../styles/morefeatures.css';

const MoreFeatures = () => {
  return (
    <Parallax strength={500}>
      <div className='container'>
        <div className='container-feature'>
          <div className='container-image'>
            <img src={image1} alt='Feature 1' />
          </div>
          <div className='container-text'>
            <h2>Discover with Precision</h2>
            <p>Unleash the power of our Advanced Search Filters to tailor your culinary journey. <br></br> Effortlessly find the perfect recipe by name, nutritional preferences, and cooking time. </p>
          </div>
        </div>

        <div className='container-feature'>
          <div className='container-text'>
            <h2>Meal Planning</h2>
            <p>Streamline your culinary routine with our Meal Planning feature, designed to simplify your life. <br></br>Take the stress out of deciding what to cook each day and embrace the joy of planning delicious, balanced meals for the entire week.</p>
          </div>
          <div className='container-image'>
            <img src={image2} alt='Feature 2' />
          </div>
        </div>
      </div>
    </Parallax>
  );
}

export default MoreFeatures;
