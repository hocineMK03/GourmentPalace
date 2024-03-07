import React, { useState,useEffect } from 'react';
import '../../../styles/createform.css'
import datahanding from '../../../services/datahanding';
import IngredientAutocomplete from './ingredientautocomplete';
const CreateRecipe = () => {
    const[ingredientslist,setIngredientslist]=useState([])
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    instructions: '',
    preparation_time: '',
    cook_time: '',
    ingredients: [],
  });
const [error,setError]=useState('')

useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const dataFromApi = await datahanding.retreiveIngredients();
        const formattedIngredients = dataFromApi.map(ingredient => ({
          value: ingredient.name,  // Change this property according to your data structure
          label: ingredient.name,  // Change this property according to your data structure
        }));
        setIngredientslist(formattedIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
  
    // Call the async function immediately
    fetchIngredients();
  }, []);
  
  


const validateInputsBeforeSend=()=>{

}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    if(recipe.ingredients.length > 20){
setError('error : maximum ingredients reached')
    }
    else{
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: [...prevRecipe.ingredients, { name: '', quantity: '', unit: '' }],
          }));
    }
  };

  const handleIngredientChange1 = (index, property, value) => {
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index][property] = value;
      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };
  const handleIngredientChange = (index, selectedOption) => {
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      // Extract the value from the selected option
      updatedIngredients[index].name = selectedOption ? selectedOption.value : '';
      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  };

  const SendForm=async ()=>{
    if(recipe.ingredients.length===0){
setError('error need at least one ingredient')
    }
    else{
        //call to request
        const result=await datahanding.postARecipe(recipe)
        if(result){
            setError('succeffully added')
        }
        else{
setError('sorry something happenned, try again')
        }
    }
  }
  return (
    <div className='form-container'>
      <form>
        <h2 id='h2form'>Create Recipe</h2>
        <div className='recipedetails'>
            <div className='smallerrecipedetails'>
                <label>
                Recipe Name:
                </label>
                <input type="text" name="name" value={recipe.name} onChange={handleInputChange} />

            </div>
            <div className='smallerrecipedetails'>
  <label>
    Recipe Description:
  </label>
  <textarea
    name="description"
    value={recipe.description}
    onChange={handleInputChange}
    rows="5" // You can adjust the number of rows as needed
  />
</div>
<div className='smallerrecipedetails'>
  <label>
    Recipe instructions:
  </label>
  <textarea
    name="instructions"
    value={recipe.instructions}
    onChange={handleInputChange}
    rows="5" // You can adjust the number of rows as needed
  />
</div>
<div className='smallerrecipedetails'>
                <label>
                Recipe cook time:
                </label>
                <input type="text" name="cook_time" value={recipe.cook_time} onChange={handleInputChange} />

            </div>

            <div className='smallerrecipedetails'>
                <label>
                Recipe preparation time:
                </label>
                <input type="text" name="preparation_time" value={recipe.preparation_time} onChange={handleInputChange} />

            </div>


        </div>
        <div className='ingredientsdetails'>
          <h3>Assign Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>



<div className='a'>
<div className='smalleringredientsdetails'>
      <label>Ingredient Name:</label>
      <IngredientAutocomplete
        value={{ value: ingredient.name, label: ingredient.name }}
        onChange={(selectedOption) => handleIngredientChange(index, selectedOption)}
        options={ingredientslist}
      />
    </div>


            <div className='smalleringredientsdetails'>
                <label>
                Quantity:
                </label>
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange1(index, 'quantity', e.target.value)}
                />
            </div>
            
            <div className='smalleringredientsdetails'>
                <label>
                Unit:
                </label>
                
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange1(index, 'unit', e.target.value)}
                />
            </div>
    </div>

              
            </div>
          ))}
          <button id='btn1' type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
        <button id='btn2' type="button" onClick={SendForm}>
Post          </button>
<p>{error}</p>

      </form>
    </div>
  );
};

export default CreateRecipe;
