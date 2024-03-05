import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../../styles/primaryfeatures.css'
import featureimg1 from '../../../images/3726428.jpg'
import featureimg2 from '../../../images/2011.i105.006_isometric obesity horizontal illustration.jpg'
import featureimg3 from '../../../images/3891338.jpg'
const PrimaryFeatures = () => {
  return (
    <div className='container'>
      <h2>Our Popular  <span className='gradient-text'>features</span></h2>
     <div className='container--features'>
     <Card id='card' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={featureimg1} />
      <Card.Body>
        <Card.Title>Search by Name And Ingredient</Card.Title>
        <Card.Text>
          user can search a recipe by it's name or by some of it's ingredients
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card id='card' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={featureimg2} />
      <Card.Body>
        <Card.Title>Recipe Details</Card.Title>
        <Card.Text>
          Every recipe have it's details , like the instruction , the ingredients, the nutrition and the cooking time
        </Card.Text>
      </Card.Body>
    </Card>
    <Card id='card' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={featureimg3} />
      <Card.Body>
        <Card.Title>Meal Planning</Card.Title>
        <Card.Text>
          Weekly and monthly meal planning feature with automatic shoping list
        </Card.Text>
      </Card.Body>
    </Card>
     </div>
    </div>
  );
}

export default PrimaryFeatures;
