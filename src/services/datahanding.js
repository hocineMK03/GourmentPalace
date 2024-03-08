const Cookies=require('js-cookie')
const ipadress = process.env.REACT_APP_BACKEND_IP || 'http://127.0.0.1:5000';

class  DataHandling{
  
  async retreiveIngredients(){
    let url='/api/handleing/getingredients'
    try {
      const response = await fetch(ipadress+url, {
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
      let url='/api/v1/createrecipe'
      try {
        const body =therecipestate
    
        const response = await fetch(ipadress+url, {
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
      let url='/api/v1/getreceipes'
        try {
          const response = await fetch(ipadress+url, {
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
      async retrieveSearchedRecipes(searchQuery) {
        let url='/api/v1/getreceipes?searchquery='+searchQuery
        console.log(searchQuery);
        try {
          const response = await fetch(ipadress+url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
            credentials: 'include', // Include cookies in the request
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
      
    
    async updateRecipeRating(recipe_id,rating){
      try {
        let url='/api/rating/assignrating'
        const body={
        recipe_id: recipe_id,
        rating: rating
      };
      const sessionToken = Cookies.get('sessiontoken');
        const response = await fetch(ipadress+url, {
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