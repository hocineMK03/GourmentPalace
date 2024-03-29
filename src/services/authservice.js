
const Cookies=require('js-cookie')
const ipadress = process.env.REACT_APP_BACKEND_IP || 'http://127.0.0.1:5000';
class AuthService {
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
        let url="/api/auth/login"
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
    

    async RegisterRequest(datastate){
      try {
        const body = this.deconstructForRegister(datastate);
  console.log(body)
  let url='/api/auth/register'
        const response = await fetch(ipadress+url, {
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
      let url='/api/auth/logout'
      fetch(ipadress+url, {
        method: 'GET',
        headers: {
          'sessiontoken': sessiontoken, // Send the specific cookie in a custom header
        },
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
      
    }

    async checkPerms(sessiontoken) {
      let url='/api/auth/checkperms'
      try {
        const response = await fetch(ipadress+url, {
          method: 'GET',
          headers: {
            'sessiontoken': sessiontoken, // Send the specific cookie in a custom header
          },
        });
    
    
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error:', error);
        return false; // Handle the error and return false
      }
    }
    

    async retreiveUsers(){
      let url='/api/auth/getusers'
      try {
        const response = await fetch(ipadress+url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
              // Add any additional headers if needed
              credentials: 'include',
          },
        });
    
    
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          return data;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error:', error);
        return false; // Handle the error and return false
      }
    }
  }
  
  module.exports = new AuthService();
  