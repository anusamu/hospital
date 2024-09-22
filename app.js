const express= require('express');
const app= new express()
const morgan=require('morgan')
const fs = require('fs');
// const path = './hospitals.json'; 
// const basicRoute=require('./route/basicroute')
app.use(morgan('dev'));
app.use(express.json());





const basicRoute=require('./route/basicsroute')
app.use('/basic',basicRoute);


app.listen(4001,()=>{
    console.log('server running on port 4000')
})
