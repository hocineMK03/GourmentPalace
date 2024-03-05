const authmodels = require('../models/authModel');
const recipemodels = require('../models/receipesModels');

class RatingServices {
  async assignRatingService(recipe_id, rating, session_token) {
    try {

        const useridInfo = await authmodels.getIdBysessiontoken(session_token);

if (useridInfo && useridInfo.user_id) {
  const userid1 = useridInfo.user_id;
  console.log(useridInfo, userid1);
} else {
  console.error('Error retrieving user ID from session token.');
  // Handle the error accordingly, e.g., return an error response or throw an exception.
  return false
}


      const userid = await authmodels.getIdBysessiontoken(session_token);
      let userid1=userid.user_id
    const didntrate=await recipemodels.retreiveRatingDetails(recipe_id,userid1)
    console.log(didntrate,userid1)

      if (userid1 && !didntrate) {
        
            const result = await recipemodels.assignRecipeRating(userid1,recipe_id, rating);
            const result1 = await recipemodels.retreiveReciperating(recipe_id);

          if (result1.length > 0) {
  // Calculate the sum of ratings
  const ratings = result1.map(row => parseInt(row.rating, 10));
  console.log("ratings", ratings);

  // Calculating the sum of ratings
  const sumOfRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = sumOfRatings / result1.length;

  console.log("finally", averageRating, "   ", sumOfRatings);
   recipemodels.updateRecipeRating(averageRating, recipe_id);
  // Update the recipe rating
} else {
  // Handle the case where there are no ratings for the recipe
  console.log('No ratings found for the recipe.');
}

            
            if(result){
                return true
            }
            return false
            
        
       
      
      }
    } catch (error) {
      console.error('Error in assignRatingService:', error.message);
      return false;
    }
  }
}

module.exports = new RatingServices();
