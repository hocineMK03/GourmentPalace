
const client=require('../db/dbconfig')
class ReceipeModel{
    async getallreceipesModel(){
        try {
            const result = await client.query('SELECT * FROM recipe');
            return result.rows;
          } catch (error) {
            throw new Error('Error querying users: ' + error.message);
          }
    }
    async getRecipeNameById(recipeIds) {
      const placeholders = recipeIds.map((_, index) => `$${index + 1}`).join(', ');
      
      const query = `SELECT name
                     FROM recipe
                     WHERE id IN (${placeholders})
                     GROUP BY id`;
      
      const result = await client.query(query, recipeIds);
      return result.rows;
    }
    
    
    async checkingredientsModel(ingredient){
     
      console.log("ing",ingredient)
      let  ing= toString(ingredient)
      const result = await client.query('SELECT id FROM ingredient WHERE name = $1', [ingredient]);
    
    return result.rows;
    }
    async getallfiltredreceipesModel(ingredients) {
      const placeholders = ingredients.map((_, index) => `$${index + 1}`).join(', ');
      
      const query = `SELECT recipe_id
                     FROM recipe_ingredient
                     WHERE ingredient_id IN (${placeholders})
                     GROUP BY recipe_id`;
    
      const result = await client.query(query, ingredients);
      console.log("here ",result.rows)
      return result.rows
    }
    async  getrecipebyname(recipe_name) {
      try {
        const query = 'SELECT * FROM recipe WHERE name ILIKE $1';
        const result = await client.query(query, [recipe_name + '%']);
        
        return result.rows;
      } catch (error) {
        console.error('Error in getrecipebyname:', error.message);
        throw error;
      }
    }
    async getrecipeImage(recipe_ids){
      const query = 'SELECT * FROM imagetable WHERE recipe_id = ANY($1::int[])';
      const result = await client.query(query, [recipe_ids]);
      
      const groupedRecipes = result.rows.reduce((acc, row) => {
        const recipeId = row.recipe_id;
        if (!acc[recipeId]) {
            acc[recipeId] = [];
        }
        acc[recipeId].push(row); 
        return acc;
    }, {});
    const recipeDetails = Object.values(groupedRecipes);
    return recipeDetails
    }
    async getreceipeDetails(recipe_ids) {
      const query = `
        SELECT
          r.id,
          r.name AS recipename,
          r.description,
          r.instructions,
          r.ratings,
          r.cook_time,
          r.preparation_time,
          ri.ingredient_id,
          i.name AS ingredient_name,
          i.calories,
          i.link,
          ri.quantity,
          ri.unit
        FROM
          recipe r
        JOIN
          recipe_ingredient ri ON r.id = ri.recipe_id
        JOIN
          ingredient i ON ri.ingredient_id = i.id
        WHERE
          r.id = ANY($1::int[]);
      `;
    
      const result = await client.query(query, [recipe_ids]);
    
      // Group rows by recipe id
      const groupedRecipes = result.rows.reduce((acc, row) => {
        const recipeId = row.id;
        if (!acc[recipeId]) {
          acc[recipeId] = {
            id: row.id,
            recipename: row.recipename,
            description: row.description,
            instructions: row.instructions,
            ratings:row.ratings,
            cooktime: row.cook_time,
          preparationtime: row.preparation_time,
            ingredients: [],
          };
        }
        acc[recipeId].ingredients.push({
          ingredient_name: row.ingredient_name,
          calories: row.calories,
          link: row.link,
          quantity: row.quantity,
          unit: row.unit,
        });
        return acc;
      }, {});
    
      const recipeDetails = Object.values(groupedRecipes);
    
      return recipeDetails;
    }
    
  async createRecipe(name,description,instructions,preparation_time,cook_time,ratings){
   
    const query='INSERT INTO recipe (name,description,instructions,preparation_time,cook_time,ratings) VALUES ($1, $2, $3,$4,$5,$6) RETURNING id'
    const result = await client.query(query,[name,description,instructions,preparation_time,cook_time,ratings])
    console.log("result")
    return result.rows[0]
  }
  async createRecipeIngredientsRelation(ingredients, recipeid) {
    // Retrieve the ids of the ingredients based on their names
    const ingredientIds = await Promise.all(
      ingredients.map(async ({ name }) => {
        const result = await client.query('SELECT id FROM ingredient WHERE name = $1', [name]);
        return result.rows[0]?.id;
      })
    );
  
    // Combine the ingredientIds with other values for the INSERT query
    const values = ingredients.map(({ quantity, unit }, index) => [ingredientIds[index], recipeid, quantity, unit]);
  
    // Use a single INSERT query to insert all rows at once
    const query = `
      INSERT INTO recipe_ingredient (ingredient_id, recipe_id, quantity, unit)
      VALUES 
      ${values.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ')}
    `;
    const flattenedValues = values.flat();
  
    // Execute the query using your PostgreSQL client
    const result = await client.query(query, flattenedValues);
    if (result && result.rowCount > 0) {
      return true;
    } else {
      // Handle the case where the insert failed
      return false;
    }
  }
  


    async deletRecipeByName(recipe_name){
      //delete
      const query='DELETE FROM recipe WHERE name=$1'
      const result=await client.query(query,[recipe_name])
      if(result.rowCount>0){
        return true
    }
    return false    }

async retreiveRatingDetails(recipe_id,userid){
  const query='SELECT ratings FROM ratings WHERE recipe_id=$1 AND userid=$2'
  const result=await client.query(query,[recipe_id,userid])
  if(result.rowCount>0){
    return true
}
return false 
}
async retreiveReciperating(recipe_id){
  const query='SELECT rating FROM ratings WHERE recipe_id=$1'
  const result=await client.query(query,[recipe_id])
  return result.rows
  
}
async assignRecipeRating(userid,recipe_id,rating){
  const query='INSERT INTO ratings (userid,rating,recipe_id) VALUES ($1, $2, $3)'
  const result = await client.query(query,[userid,rating,recipe_id])
  if(result.rowCount>0){
    return true
}
return false }
async updateRecipeRating(rating,recipe_id){
const query='UPDATE recipe SET ratings = $1 WHERE id =$2'
const result = await client.query(query,[rating,recipe_id])
  return result
}

 
}

module.exports=new ReceipeModel