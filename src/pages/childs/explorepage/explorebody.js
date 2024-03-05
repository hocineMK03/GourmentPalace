import React,{ useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import cardtest from '../../../images/pasta.jpg'
import { FaStar } from "react-icons/fa6";
import '../../../styles/explorebody.css'
import datahanding from '../../../services/datahanding';
import authservice from '../../../services/authservice';
import RecipeDetails from './recipedetails';
import {useNavigate } from 'react-router-dom';

const ExploreBody = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [particularRecipe,setParticularRecipe]=useState(null)
  const [cansend,setCansend]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await datahanding.retrieveAllRecipes()
        setRecipes(data);
      } catch (error) {
        console.error(error);
        // Handle error state
      }
    };

    fetchData();
  }, []);


  const handleParticularRecipe=(recipe)=>{
setParticularRecipe(recipe)
console.log(particularRecipe)
  }
  const handleClose = () => {
    setParticularRecipe(null);
    setCansend(false)
  };
  useEffect(() => {
    console.log(particularRecipe);
    setCansend(true)
  }, [particularRecipe,cansend]);

  const checkRating=()=>{
const result=authservice.checkIfAuth()
if(result){
  console.log("here")

}
else{
  console.log("hereeee")
  navigate('/login');

}
  }
  return (
    <div className="cards">
    {recipes.map((recipe) => (
      <Card key={recipe.id} style={{ width: '18rem', marginTop: '50px' }}>
        <Card.Img variant="top" src={cardtest} />
        <Card.Body>
          <div className="ratingicon" onClick={checkRating}>
            <span>{recipe.ratings}/5</span>
            <FaStar id="theicon" />
          </div>
          <Card.Title>{recipe.recipename}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>cook time: {recipe.cooktime} h</ListGroup.Item>
          <ListGroup.Item>preparation time : {recipe.preparationtime} h </ListGroup.Item>
        </ListGroup>

        <Card.Body className="card-btn">
        <Button id="card-btn" onClick={() => handleParticularRecipe(recipe)}>Details</Button>
        </Card.Body>
      </Card>
    ))}
    {particularRecipe && (
        <RecipeDetails particularRecipe={particularRecipe} handleClose={handleClose} />
      )}
  </div>
  )
}

export default ExploreBody
