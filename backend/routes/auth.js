const express = require("express");
const User = require("../modals/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';
const fetchuser=require('../middleware/fetchuser')

router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid mail").isEmail(),
    body("password", "Enter atleast 4 characters").isLength({ min: 4 })
  ],
  async(req, res) => {

    const errors=validationResult(req)
    if(errors.isEmpty()==false)
    {
        return res.status(400).json({errors:errors.array()})
    }

    try{
        let user=await User.findOne({email:req.body.email})
        if(user)
        {
            return res.status(400).json({error:"This email already exists"})
        }
        const salt=await bcrypt.genSalt(10)
        const secPass=await bcrypt.hash(req.body.password, salt)
        user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET)
        res.json({authtoken})
    }
    catch(error){
        res.status(500).send("Some error occured !!!")
    }
});

router.post(
    "/login",
    [
      body("email", "Enter a Valid mail").isEmail(),
      body("password", "Password cannot be blank").exists()
    ],
    async(req, res) => {

    const errors=validationResult(req)
    if(errors.isEmpty()==false)
    {
        return res.status(400).json({errors:errors.array()})
    }

    const {email, password}=req.body
    try{
        let user=await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({error: "Please login with correct credentials"})
        }
        const passwordcompare=await bcrypt.compare(password, user.password)
        if(!passwordcompare)
        {
            return res.status(400).json({error: "Please login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET)
        res.json({authtoken})
    }
    catch{
        res.status(500).send("Internal server error")
    }
})

router.post('/getuser',fetchuser, async(req, res)=>{
    try{
        userId=req.user.id
        const user=await User.findById(userId).select('-password')
        res.send(user)
    }
    catch(error){
        res.status(500).send("Internal Server error")
    }
})
module.exports = router;
