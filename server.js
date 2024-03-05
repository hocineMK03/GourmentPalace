const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser')
const cors = require('cors');
const port=process.env.port||5000
const rp = require('./src/routes/receipeRoutes')
const authroute=require('./src/routes/authRoute')
const ingredientroute = require('./src/routes/ingredientRoutes')
const ratingroute=require('./src/routes/ratingroute')
const corsOptions = {
    origin: 'http://127.0.0.1:3000', // Replace with your allowed origin
    methods: 'GET,POST,DELETE',
    credentials: true,
    exposedHeaders: 'Set-Cookie',
  };
app.use(cors(corsOptions));
app.use(cookieparser())
app.use(bodyparser.json())
app.use('/api/auth',authroute)
app.use('/api/v1',rp)
app.use('/api/handleing',ingredientroute)
app.use('/api/rating',ratingroute)
app.listen(port,()=>{
    console.log(`now listening to port ${port}`)
})