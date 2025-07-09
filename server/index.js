const express=require('express');
const jwt=require('jsonwebtoken')
const User=require('./models/user.model')
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcrypt');

const app=express();

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/FirstFullStack')

app.post("/api/register",async (req,res)=>{
    console.log(req.body);
    try{
        const temp=await User.findOne({
            email:req.body.email
        })
        if(temp){
            res.json({status:"error",error:"User Already Exists"});
        }else{
            const newPassword=await bcrypt.hash(req.body.password,10);
            const user=await User.create({
                name:req.body.name,
                email:req.body.email,
                password:newPassword,
            })
            res.json({status:'ok'})
        }
    }
    catch{
        res.json({status:"error",error:"Network Issues"})
    }
})

app.post("/api/login",async (req,res) => {
    const temp=await User.findOne({
        email:req.body.email,
    })

    if(temp){
        const isPasswordValid = await bcrypt.compare(req.body.password, temp.password);
        if(isPasswordValid){
            const token=jwt.sign({
                name:temp.name,
                email:temp.email
            },'highly-secret')
            res.json({status:'ok',userName:token});
         }
    }else{
        res.json({status:'error',error:'No Data Found'})
    }

})

app.get("/api/quote",async(req,res)=>{
    const token=req.headers['x-access-token']
    try{
        const decoded=jwt.verify(token,"highly-secret");
        const email=decoded.email;
        const user=await User.findOne({email:email})
        return res.json({status:"ok",quote:user.quote});
    }
    catch{
        return res.send({status:"error",error:"Invalid Token"})
    }
})

app.post("/api/quote",async(req,res)=>{
    const token=req.headers['x-access-token']
    try{
        const decoded=jwt.verify(token,"highly-secret");
        const email=decoded.email;
        const user=await User.updateOne({email:email},{$set:{quote:req.body.quote}})
        return res.json({status:"ok",quote:user.quote});
    }
    catch{
        return res.send({status:"error",error:"Invalid Token"})
    }
})
app.listen(8888,()=>{
    console.log(`Sever is Running At http://localhost:8888`)
})