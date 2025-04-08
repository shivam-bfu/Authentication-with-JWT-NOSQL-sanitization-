const express =require('express')
const { tokenGenerator } = require('./utils/jwt')
const app= express()
const path= require('path')
const userModel=require('./models/model')
const { chKconstraint } = require('./controllers/constraintChk')
const { hashing } = require('./utils/hashing')
const cookieParser = require('cookie-parser')


app.set("view engine", "ejs")
app.use(express.json())
require('dotenv').config()
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())


app.get('/signUp',(req,res)=>{
    if(req.cookies.token)
        {
            return res.send('already loggedin')
        }
    res.render('signUp')
})

app.post('/signUp', async (req,res)=>{

    const {name, email, password}=req.body
    const uniqueEmail=await userModel.findOne({email:email})


    if(uniqueEmail)
    {
        return res.send("already exist try new eamil dont be malicious")
    }


    const chk=chKconstraint(name,email,password)


    if(!chk.valid)
    {
        return res.send("something went wrong dont try sending malicious code or",chk.error)
    }
    try{
        const newPassword=await hashing(password)

        const user= await userModel.create({
            name:name,
            email:email,
            password:newPassword,
        })        
    const token=tokenGenerator(user._id)
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:'Strict',
        maxAge:360000,
        
    })
    res.status(201).send({ message: `Welcome, ${name}!` });

    }
    catch(err)
    { 
        console.log(err);
        
      res.send('something fucked up sry bruh')
    }
})

// app.get('/login',(req,res)=>{
//     if(req.cookies.token)
//     {
//         return res.send('already loggedin')
//     }
//     res.render('logIn')
// })

// app.post('/logIn',(req,res)=>{


// })
app.listen(3000)
