import React, { useState } from 'react'

const CreateIngredient = () => {

    const [ingredient,setIngredient]=useState({
        name:'',
        link:'',
        calories:''
    })
    const [error,setError]=useState('')
    

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setIngredient((prevIngredient)=>({
            ...prevIngredient,
            [name]:value,
        }))
    }
  return (
    <div className='form-container'>
      
      <form>
        <h2 id='h2form'>Create Ingredient</h2>
        <div className='recipedetails'>
        <div className='smallerrecipedetails'>
                <label>
                Ingredient Name:
                </label>
                <input type="text" name="name" value={ingredient.name} onChange={handleInputChange} />

            </div>



            <div className='smallerrecipedetails'>
                <label>
                Ingredient Link:
                </label>
                <input type="text" name="link" value={ingredient.link} onChange={handleInputChange} />

            </div>
            <div className='smallerrecipedetails'>
                <label>
                Ingredient Calories:
                </label>
                <input type="text" name="calories" value={ingredient.calories} onChange={handleInputChange} />

            </div>
        </div>
        <button type="button">
Post          </button>
<p>{error}</p>
      </form>
    </div>
  )
}

export default CreateIngredient
