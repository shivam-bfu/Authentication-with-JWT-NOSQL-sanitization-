const mongoose= require('mongoose')
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI,{
}).then(()=>{
    console.log('connect to the database ')
})
.catch((err)=>{
    console.log("this error occured", err);
})


const schema = mongoose.Schema({
    name:String, 
    email:String,
    password:String,
})

module.exports =mongoose.model('user',schema)