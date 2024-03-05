const Cookies=require('js-cookie')

class  DataHandling{
  async retreiveIngredients(){
    try {
      const response = await fetch('http://127.0.0.1:5000/api/handleing/getingredients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
          credentials: 'include', // Include cookies in the request

        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        return responseData; // Return the data if the response is okay
      } else {
        console.error('Error during API request:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error during API request:', error.message);
      throw error;
    }
  }
    async postARecipe(therecipestate){
      try {
        const body =therecipestate
    
        const response = await fetch('http://127.0.0.1:5000/api/v1/createrecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          credentials: 'include', // Include cookies in the request
        });
    
        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const responseData = await response.json();
          // Handle the successful response data if needed
          console.log('Login successful:', responseData);
          
          return true;
        } else {
          // Handle the error response (status code not 2xx)
          // const errorData = await response.json();
          // console.error('Login failed:', errorData);
          // throw new Error('Login failed');
          return false;
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error during login:', error);
        throw error;
      }
    }
    async retrieveAllRecipes() {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/v1/getreceipes', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
              credentials: 'include', // Include cookies in the request

            },
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return responseData; // Return the data if the response is okay
          } else {
            console.error('Error during API request:', response.status);
            return null;
          }
        } catch (error) {
          console.error('Error during API request:', error.message);
          throw error;
        }
      }
      
    async retreiveSearchedRecipes(){
        
    }
     
    
    async updateRecipeRating(recipe_id,rating){
      try {
        
        const body={
        recipe_id: recipe_id,
        rating: rating
      };
      const sessionToken = Cookies.get('sessiontoken');
        const response = await fetch('http://127.0.0.1:5000/api/rating/assignrating', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'sessiontoken': sessionToken,
                    },
          body: JSON.stringify(body),
          credentials: 'include', // Include cookies in the request
        });
    
        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const responseData = await response.json();
          // Handle the successful response data if needed
          console.log('Login successful:', responseData);
          
          return true;
        } else {
          // Handle the error response (status code not 2xx)
          // const errorData = await response.json();
          // console.error('Login failed:', errorData);
          // throw new Error('Login failed');
          return false;
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error during login:', error);
        throw error;
      }
    }

}
module.exports=new DataHandling()