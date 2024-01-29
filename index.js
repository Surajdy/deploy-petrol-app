const express =require('express')
const {connection}=require('./db')
const {modal}=require('./modal/user.modal')
require("dotenv").config()
const jwt =require("jsonwebtoken")
const bcrypt =require('bcrypt')
const {authenticateToken}=require('./middleware/authentication')
const app=express();
app.use(express.json())
app.get("/",(req,res)=>{
  res.send("Welcome to homepage ")
})


app.post("/register",async(req,res)=>{
    const {name,email,password,phone_number,vehicle_type}=req.body;
    console.log(name,email,password,phone_number,vehicle_type);
    bcrypt.hash(password, 5, async function(err, hash) {
        await modal.create({
            name:name,
            email:email,
            password:password,
            phone_number:phone_number,
            vehicle_type:vehicle_type
        });
        res.send("signup successfull");
    });
 
})

app.post("/login",async(req,res)=>{
    const{name,email,password}=req.body;

    const user =await modal.findOne({name,email});

    const hashed_password=user.password;
    
    bcrypt.compare(password, hashed_password, function(err, result) {
      if(result){
        const token =jwt.sign({auth:"yes"},"secretcode")
       console.log(token);
        return res.send({
            msg:"login successfull",
            token:token,
        })
      }else {
        res.send("login failed")
    }
    });
})

app.get("/homepage",authenticateToken,async(req,res)=>{


    res.send("welcome to homepage")
    
})

const PORT =process.env.PORT;
app.listen(PORT,async()=>{
 try {
   await connection;
    console.log("connected to port "+PORT)
 } catch (error) {
    console.log("unable to do connection")
 }
})