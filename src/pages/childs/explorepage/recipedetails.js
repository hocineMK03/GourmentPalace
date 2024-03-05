import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Rating from './rating';
import datahanding from '../../../services/datahanding';
import authservice from '../../../services/authservice';
import { useNavigate } from 'react-router-dom';

const RecipeDetails = ({ particularRecipe, handleClose }) => {
  const navigate = useNavigate();

  const [rating, setRating] = useState(particularRecipe.ratings);

  const sendrating=async()=>{
    if(authservice.checkIfAuth()){
      const result = await datahanding.updateRecipeRating(particularRecipe.id, rating);
      if (result) {
        console.log('Rating updated successfully');
        // Handle any additional logic after successful update
      } else {
        console.error('Failed to update rating');
        // Handle error condition
      }
    }
    else{
      navigate('/login');

    }
   
    
  }
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <Modal show={true} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{particularRecipe.recipename}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Description: {particularRecipe.description}</p>
      <p>Instructions: {particularRecipe.instructions}</p>
      <p>Ratings: {particularRecipe.ratings}/5</p>
      <Rating onChange={handleRatingChange} initialRating={rating} />
            <p>Cook Time: {particularRecipe.cooktime} h</p>
      <p>Preparation Time: {particularRecipe.preparationtime} h</p>

      <h4>Ingredients:</h4>
      <ul>
        {particularRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            <a href={ingredient.link}>{ingredient.quantity} {ingredient.unit} {ingredient.ingredient_name} </a>
          </li>
        ))}
      </ul>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={() => {
  handleClose();
  sendrating();
}}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default RecipeDetails
