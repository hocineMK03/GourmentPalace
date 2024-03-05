const models=require('../models/ingredientModels')
 class IngredietnServices{
async handleRetreiveIngredients(){
    try{
        const result=await models.getIngredients()
        if(result){
            return result
        }
        return false
    }
    catch(error){
        return false
    }
}
    async handlePostIngredient(name,link,calories){
        try{
            const num_calories=parseFloat(calories)
            const check=await models.checkIngredient(name)
            console.log(check)
            if(!check){
                const result=await models.createIngredient(name,link,num_calories)
                
                if(result){
                    return true
                }
                else{
                    return false
                }
            }
            else{
console.log("alrea&dy exist")
return false
            }
        }
        catch(error){
            console.error('Error in ReceipeService.handlegetallreceipesService:', error.message);
            throw error; 
            return null
        }
    }

    async handleDeleteIngredient(name){
        try{
            const check=await models.checkIngredient(name)
          if(check){
            console.log(check)

            const result=await models.deleteIngredient(name)
           
            return result
          }
        }
        catch(error){
            console.error('Error in ReceipeService.handlegetallreceipesService:', error.message);
            throw error; 
        }
    }

}
module.exports=new IngredietnServices