const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function handleRegister(req,res){
    const {name,email,password} = req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).json({message:"Required all Credentials"}) 
        }

        const userExist =await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "User already registered"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name:name,
            email:email,
            passwordHash:hashedPassword
        })
        return res.status(201).json("User created")
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function handleLogin(req,res){
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json("Required all Credentials");
        }
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(404).json({message:"User not found"});
        }
        const result =await  bcrypt.compare(password,userExist.passwordHash);
        if(!result){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        return res.status(200).json({
            token,
            user:{
                id: userExist._id,
                name:userExist.name,
                email:userExist.email,
            },
        })
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports ={
    handleRegister,
    handleLogin
}