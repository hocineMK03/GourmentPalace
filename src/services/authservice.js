
const Cookies=require('js-cookie')
class AuthService {
  checkAccess(){
  //  try{
  //   const access=Cookies.get('access')
  //   if(access==='true'){
  //     return true
  //   }
  //   return false
  //  }
  //  catch(error){
  //   return false
  //  }


  //don't have cookie yet
  return true
  }
  checkIfAuth(){
    const sessiontoken=Cookies.get('sessiontoken')
    const username=Cookies.get('username')
    if(sessiontoken && username){
      return true
    }
    return false
  }
     deconstructForLogin(datastate) {
      const { usernameOrEmail, password, isEmail } = datastate;
  
      if (!isEmail) {
        return {
          name: usernameOrEmail,
          password: password,
        };
      }
  
      return {
        email: usernameOrEmail,
        password: password,
      };
    }
    deconstructForRegister(datastate){
      const {name,username,email,password}=datastate
      if(username !== '' && username !== null){
      return {
        name:name,
        username:username,
        email:email,
        password:password
      }
      }
      return {
        name:name,
        username:'',
        email:email,
        password:password
      }
    }
    async LoginRequest(datastate) {
      try {
        const body = this.deconstructForLogin(datastate);
    
        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
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
    

    async RegisterRequest(datastate){
      try {
        const body = this.deconstructForRegister(datastate);
  console.log(body)
        const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
  
        // Check if the request was successful (status code 2xx)
        if (response.status===200) {
          const responseData = await response.json();
          // Handle the successful response data if needed
          console.log('Login successful:', responseData);
          return true;
        } else {
          // Handle the error response (status code not 2xx)
          // const errorData = await response.json();
          // console.error('Login failed:', errorData);
          // throw new Error('Login failed');

          return false
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error during login:', error);
        throw error;
      }
    }

    async logOutRequest(sessiontoken){
      fetch('http://127.0.0.1:5000/api/auth/logout', {
        method: 'GET',
        headers: {
          'sessiontoken': sessiontoken, // Send the specific cookie in a custom header
        },
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
      
    }
  }
  
  module.exports = new AuthService();
  