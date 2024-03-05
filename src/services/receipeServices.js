const models=require('../models/receipesModels')
class ReceipeServices{
  async deleteRecipe(recipe_name){
    try{
      
      return false
    }
    catch(error){
      return false
    }
  }
  async handleCreateRecipe(ingredients, name, description, instructions, preparation_time, cook_time, ratings) {
    try {
      // Check for required fields
      console.log(instructions)
      if (!ingredients || !name || !description || !instructions) {
        console.error('Missing required fields.');
        return false;
      }
  
      // Set default values if not provided
      preparation_time = preparation_time || 0;
      cook_time = cook_time || 0;
      ratings = ratings || 5;
  
      // Parse numeric values
      const preparation_time1 = parseFloat(preparation_time);
      const cook_time1 = parseFloat(cook_time);
      const ratings1 = parseInt(ratings);
  
      console.log(preparation_time1, cook_time1, ratings1);
  
      // Create recipe
      const createRecipe = await models.createRecipe(name, description, instructions, preparation_time1, cook_time1, ratings1);
  
      console.log("createRecipe", createRecipe);
  
      if (createRecipe) {
        const recipeid = createRecipe.id;
  
        // Create relation
        const createRelation = await models.createRecipeIngredientsRelation(ingredients, recipeid);
  
        if (createRelation) {
          return true;
        } else {
          console.error('Failed to create ingredient relation.');
          return false;
        }
      } else {
        console.error('Failed to create recipe.');
        return false;
      }
    } catch (error) {
      console.error('Error in handleCreateRecipe:', error.message);
      throw error; // Rethrow the error for proper error handling in the calling function
    }
  }
  
    async handlegetallreceipesService(){
        try {
            let receipes = await models.getallreceipesModel()
            if(receipes.length >0){
              //exist
              receipes=receipes.map(row => row.id);
              //now retreive details
              const intRecipes = receipes.map(id => parseInt(id));
              console.log(intRecipes)
              receipes=await models.getreceipeDetails(intRecipes)
              let recipesimages=await models.getrecipeImage(intRecipes)
            //   const mergedData = [];
            //   for (const recipe of receipes) {
            //     const matchingImage = recipesimages.find(image => image.recipe_id === recipe.id);
            //     mergedData.push({ ...recipe, images: matchingImage ? matchingImage.image_data : [] });
            // }
            return receipes
            }
            else{
              return null
            }
          } catch (error) {
            console.error('Error in ReceipeService.handlegetallreceipesService:', error.message);
            throw error; 
          }
        }
        async handlegetrecipesdetailsbynameService(recipe_name){
          try{
            let recipes=await models.getrecipebyname(recipe_name)
            
            if(recipes.length >0){
              //exist
              recipes=recipes.map(row => row.id);
              //now retreive details
              const intRecipes = recipes.map(id => parseInt(id));
              recipes=await models.getreceipeDetails(intRecipes)
              return recipes
            }
            else{
              return null
            }
          }
          catch(error){
            console.error('Error in ReceipeService.handlegetallreceipesService:', error.message);
            throw error; 
          }
        }
      async checkingredientsService(ingredient){
       try{
        const ingredientchecker=await models.checkingredientsModel(ingredient)
        console.log("h",ingredientchecker[0])

        if(ingredientchecker[0]){
          return ingredientchecker
        }
       return null;
       }
       catch(error){
        console.error('Error in ReceipeService.checkingredientsService:', error.message);
        throw error; 
        //return undefined;
       }
      }

      async handlegetfilteredreceipeservice(ingredients){
        
        console.log("service ",ingredients)
        try {
          const receipes=await models.getallfiltredreceipesModel(ingredients)
          const recipeIds = receipes.map((recipe) => recipe.recipe_id);

          console.log("recipeIds ", recipeIds);
          const receipedetails= await models.getRecipeNameById(recipeIds)
          console.log("receipedetails ",receipedetails)

          return receipedetails;
        } catch (error) {
          console.error('Error in ReceipeService.handlegetfilteredreceipeservice:', error.message);
          throw error; 
        }
    }
    }

module.exports=new ReceipeServices