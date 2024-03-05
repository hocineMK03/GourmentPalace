const client=require('../db/dbconfig')
class IngredientModels{

    async createIngredient(name,link,calories){
        const query = 'INSERT INTO ingredient (name, link, calories) VALUES ($1, $2, $3)';
        const result=await client.query(query,[name,link,calories])
        if(result.rowCount>0){
            return true
        }
        return false
    }   
    async checkIngredient(name){
        const query='SELECT id FROM ingredient WHERE name=$1'
        const result = await client.query(query, [name]);
        if(result.rowCount>0){
            return true
        }
        return false
    }
    async getIngredients(){
        const query='SELECT name FROM ingredient'
        const result=await client.query(query)
        return result.rows
    }
    async deleteIngredient(name){
        const query='DELETE FROM ingredient WHERE name=$1'
        const result=await client.query(query,[name])
        console.log(result)
        if(result.rowCount>0){
            return true
        }
        return false
    }
    
}


module.exports=new IngredientModels