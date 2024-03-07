import LandingPage from './pages/landingpage';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import ExplorePage from './pages/explorepage';
import AdminManagement from './pages/adminmanagement';
import { useEffect, useState } from 'react';
import authservice from './services/authservice';
import Cookies from 'js-cookie';
function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Set this based on your authentication logic
const checkAccess=()=>{
  console.log(isAdmin)
const sessiontoken=Cookies.get('sessiontoken')
if(sessiontoken){
  if(authservice.checkPerms(sessiontoken)){

    setIsAdmin(true)
  }
  else{
    setIsAdmin(false)
  }
  console.log(isAdmin)
}

}
useEffect(() => {
  checkAccess()
}, [isAdmin]);
return (
    
    <Router>
  
      <Routes>
      <Route path="/home" element={<LandingPage isAdmin={isAdmin}/>}/>
      <Route path="/login" element={<LoginPage />}/> 
      <Route path="/register" element={<RegisterPage />}/>

      <Route path="/explore" element={<ExplorePage/>}/>

      {isAdmin && <Route path="/dashboard" element={<AdminManagement />} />}
            </Routes>
  
  </Router>
  );
}

export default App;
