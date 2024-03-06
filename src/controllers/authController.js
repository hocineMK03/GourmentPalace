const services=require('../services/authServices')

class AuthControllers{
    async handleAccess(req,res,next){
        const sessiontoken = req.headers['sessiontoken'];
        console.log("sessiontoken",sessiontoken)
        console.log("typeof sessiontoken", typeof sessiontoken);
        if(sessiontoken!==undefined && sessiontoken!==null && sessiontoken!=""  && sessiontoken){
    const result=services.checkAccess(sessiontoken)
    if(result){
        return res.status(200).json('user authorized')
    }
    return res.status(400).json('user hass no access')
        }
        return res.status(404).json('couldnt indetify user')
    }
    async handleLogOut(req,res){
        const sessiontoken = req.get('sessiontoken')
        const result=await services.handleLogOutService(sessiontoken)
        console.log("result",result)
        return res.status(200).json({'message':'logout'})
    }
    async handleLogin(req,res){
        const {name,email,password}=req.body
        if(password !== undefined){
            try{

                const result=await services.handleLogin(name,email,password)
                if(result !=null){
                    //add session for user and a cookie for his name
                    console.log(result)
                  
                    res.cookie('username',result.username);
                    const sessionresult=await services.settingUpSessionService(result.userid)
                    const updatetime=services.updateLastLogin(result.userid)
                    res.cookie('sessiontoken',sessionresult.token,{
                        expires:sessionresult.expiration_time
                    })
                    const ca = await services.checkAccess()
                    
                    //add access here
                    
                    return res.status(200).json({'message':'found your account'})

                }
                else{
                    console.log("here")
                }
                return res.status(400).json({'error':'couldnt find the account'})
            }
            catch(error){
                return res.status(500).json({'error':'something happenned in db'})
            }
        }
        
    else{
}            return res.status(400).json({'message':'password is empty '})

    }

    async handleRegister(req,res){
        const {name,username,email,password}=req.body
        if(name === undefined || email === undefined || password === undefined){
            return res.status(400).json({'error':'inputs arent valid please try again'})

        
        }
        else{
            const result =await services.handleRegisterService(name,username,email,password)
            console.log(result)
            if(result!=null){
                //add session for user and a cookie for his name
                return res.status(200).json({'username':result.username})
            }
            return res.status(200).json({'error':"error"})
        }
    }
    async validateEmail(){}
}
module.exports=new AuthControllers