const services=require('../services/ingredientServices')
class IngredientController{

async handleRetreiveIngredients(req,res){
try{
    const result=await services.handleRetreiveIngredients()
    if(result){
        return res.status(200).json(result)
    }
    return res.status(400).json('couldnt retreive them')
}
catch(error){
    return res.status(500).json('internal error')
}
}
async handlePostIngredient(req,res){
    const {name,link,calories}=req.body
    const result=await services.handlePostIngredient(name,link,calories)
   try{
    if(result){
        return res.status(200).json('ingredient posted')
    }
    
    else{
        return res.status(400).json('ingredient already exist')
    }
   
   }
   catch(error){
    return res.status(500).json('something in db')
   }
}   


async handleDeleteIngredient(req,res){
    const {name}=req.body

    try{
        const result=await services.handleDeleteIngredient(name)
        if(result){
            return res.status(200).json("succefully deleted")
        }
        return res.status(400).json("cant delete")
    }
    catch(error){
        return res.status(500).json('internal error')
    }
}
}


module.exports=new IngredientController