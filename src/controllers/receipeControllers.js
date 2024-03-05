const services=require('../services/receipeServices')


class ReceipeControllers{
  async handleCreateRecipe(req,res){
    const {ingredients,name,description,instructions,preparation_time,cook_time,ratings}=req.body

    try{

const result=services.handleCreateRecipe(ingredients,name,description,instructions,preparation_time,cook_time,ratings)
console.log(result)
if(result){
return res.status(200).json('successuflly inserted')
}
return res.status(400).json("couldnt insert ")
    }
    catch(error){
      return res.status(500).json('internal error')
    
    }


  }
    async handlereceipes(req,res){
      
        const {ingredients}=req.body
        //const ingredients=['a','b','c']
        let t=[]
        
        //console.log(ingredients)
//validation

        if(ingredients){
          if(ingredients.length>0){
            for (const ing of ingredients) {
              try {
                const result = await services.checkingredientsService(ing);
        
                if (result !== null) {
                  console.log(ing + " is" + result[0].id);
                  t.push(result[0].id);
                } else {
                  console.log(ing + " isn't");
                }
              } catch (error) {
                console.error('Error in route handler:', error.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
              }
            }
            //do filtering now
  
            try{
              //change wiht new object
              //console.log("t is",t)
              let results=await services.handlegetfilteredreceipeservice(t)
              //console.log("results",results)
              res.status(200).json({results})
            }
            catch(error){
              console.error('Error in route handler:', error.message);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          }


return;
        }
        else if (req.query.searchquery){
          //get receipe names and ingredients

          const recipe=await services.handlegetrecipesdetailsbynameService(req.query.searchquery)
          
          res.status(200).json(recipe)
        }
        else{
          //res.status(200).json({'message':'message'})
          try {
            //res.status(202).json({'message':'accepted, sending started'})
            const receipes = await services.handlegetallreceipesService();
            
            res.status(200).json(receipes);
            //console.log(receipes)
          } catch (error) {
           
            console.error('Error in route handler:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
        
        
    }
    
}

module.exports=new ReceipeControllers