const {Client}=require('pg')
require('dotenv').config();

const client=new Client({
    host:process.env.DB_HOST || "localhost",
    user:process.env.DB_USER || "postgres",
    port:process.env.DB_PORT || 5432,
    password:process.env.DB_PASSWORD || "admin",
    database:process.env.DB_NAME || "database"
})

if(client.connect()){
    console.log("connected")
}
else{
    console.log("something happened")
}
module.exports=client