const client=require('../db/dbconfig')

class AuthModel{
    async checkPermession(userid){
        const query="SELECT is_admin FROM usertable WHERE userid=$1 "
        const result=await client.query(query,[userid])
        if(result.rowCount>0){
            return true
        }
        return false
    }
    async getIdBysessiontoken(sessiontoken){
        console.log(sessiontoken)
        const query = 'SELECT user_id FROM sessions WHERE token=$1';
        const result = await client.query(query, [sessiontoken]);
        // You might want to check the result or handle errors if needed
        return result.rows[0];
    }
    async  deleteSession(sessiontoken) {
        const query = 'DELETE FROM sessions WHERE token = $1';
        const result = await client.query(query, [sessiontoken]);
        // You might want to check the result or handle errors if needed
        return result;
    }
    async CreateSession(userid,sessiontoken,expirationTime){
    const query='INSERT INTO sessions (user_id, token, expiration_time) VALUES ($1, $2, $3) RETURNING token,expiration_time'
    const result=await client.query(query,[userid,sessiontoken,expirationTime])
    return result.rows
}
async updateLastLogin(userID){
    const query = 'UPDATE usertable SET lastlogin = CURRENT_TIMESTAMP WHERE userid = $1';
    const result = await client.query(query, [userID]);
    // Handle the result or add error handling if needed
    return result;
}
async checkAuthByName(name) {
    const query = 'SELECT userid,username,password FROM usertable WHERE name = $1 ';
    const result = await client.query(query, [name]);
    return result.rows
}

async checkAuthByEmail(email) {
    const query = 'SELECT userid,username,password FROM usertable WHERE email = $1 ';
    const result = await client.query(query, [email]);
    return result.rows
}

async checkAuthByBoth(name,email){
   const query='SELECT username FROM usertable WHERE name = $1 and email = $2'
    const result = await client.query(query,[name,email]);
    return result.rows
}
async registerUserByUsername(name,username,email,password){
    const query = 'INSERT INTO usertable (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    

    const values = [name, username, email, password];
   
   try {
    const result = await client.query(query, values);
    return result.rows[0];
} catch (error) {
    console.error('Error in registerUser:', error);
    return null; // Return null or handle the error according to your application's logic
}
}
async registerUser(name,email,password){
    const query = 'INSERT INTO usertable (name,username, email, password) VALUES ($1, $2, $3,$4) RETURNING *';
    let username=name
    const values = [name, username,email, password];
    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error in registerUser:', error);
        return null; // Return null or handle the error according to your application's logic
    }
}
}
module.exports=new AuthModel