const models=require('../models/authModel')
const utils=require('../utils/authutils')
const uuid = require('uuid');
class AuthServices{
async checkAccess(session_token){
    const useridInfo = await authmodels.getIdBysessiontoken(session_token);
    if (useridInfo && useridInfo.user_id){

        const hasaccess=models.checkPermession(userid)
        if(hasaccess){
            return true
        }
        return false
    }
    else{
        return false
    }
}
async updateLastLogin(userid){
   
try{
    const result=await models.updateLastLogin(userid)
return result
}
catch(error){
    console.error('Error in AuthServices.handleLoginByName:', error.message);
    throw error; 
}
    }
async handleLogOutService(sessiontoken){
try{
    const result=await models.deleteSession(sessiontoken)
    return result
}
catch(error){
    console.error('Error in AuthServices.handleLoginByName:', error.message);
    throw error; 
}
}
 async settingUpSessionService(userid){
const sessiontoken=uuid.v4();
try{
    const expirationTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
const result=await models.CreateSession(userid,sessiontoken,expirationTime)
if(result!=null){
    return result[0]

}
return null
}
catch(error){
    console.error('Error in AuthServices.handleLoginByName:', error.message);
    throw error; 
}
 }
async handleLogin(name,email,password){
    if(name!== undefined){
try{
    console.log(name,email,password)
    const result=await models.checkAuthByName(name)
    
    if (result && result.length > 0) {
        let oldpassword = result[0].password;
        let testhash = await utils.compareHashedPasswords(password, oldpassword);
        console.log("hashedPassword",password,"oldpassword",oldpassword)
        if (testhash) {
            // Passwords match, login is successful
            console.log("yesy it is")
            return result[0];
        } else {
            // Passwords do not match, login failed
            console.log("no")
            return null;
        }
    }
}
catch(error){
    console.error('Error in AuthServices.handleLoginByName:', error.message);
    throw error; 
}
    }
    else if(email !== undefined){
     
        if(utils.validatemail(email)){
            try{
                const result=await models.checkAuthByEmail(email)
                if (result && result.length > 0) {
                    let oldpassword = result[0].password;
                    let testhash = await utils.compareHashedPasswords(password, oldpassword);
                    console.log("hashedPassword",password,"oldpassword",oldpassword)
                    if (testhash) {
                        // Passwords match, login is successful
                        console.log("yesy it is")
                        return result[0];
                    } else {
                        // Passwords do not match, login failed
                        console.log("no")
                        return null;
                    }
                }
            }
            catch(error){
                console.error('Error in AuthServices.handleLoginByEmail:', error.message);
                throw error; 
            }
        
        }
        else{
            return null;
        }
    }
}


async  handleRegisterService(name, username, email, password) {
    try {
        let result = await models.checkAuthByBoth(name, email);

        if (result && result.length > 0) {
            // User already exists
            return null;
        } else {
           let hashedPassword = await utils.hashpasswords(password);
            console.log('Hashed Password during registration:', hashedPassword);
            if (utils.validatemail(email)) {
                if (username !== undefined) {
                    result = await models.registerUserByUsername(name, username, email, hashedPassword);

                    if (result != null) {
                        return result;
                    } else {

                        return null;
                    }
                } else {
                    result = await models.registerUser(name, email, hashedPassword);

                    if (result != null) {
                        return result;
                    } else {
                        console.log("exist")

                        return null;
                    }
                }
            } else {
                return null; // Invalid email
            }
        }
    } catch (error) {
        console.error("Error in handleRegisterService:", error);
        return null; // Return null or a specific error message based on your use case
    }
}

}
module.exports=new AuthServices