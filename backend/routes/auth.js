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
    body("docex_id", ""),
    body("password", "Enter atleast 4 characters").isLength({ min: 4 })
  ],
  async(req, res) => {
    let success=false
    const errors=validationResult(req)
    if(errors.isEmpty()==false)
    {
        return res.status(400).json({errors:errors.array()})
    }

    try{
        let user=await User.findOne({docex_id:req.body.docex_id })
        if(user)
        {
            return res.status(400).json({error:"This DocEx id already exists"})
        }
        const salt=await bcrypt.genSalt(10)
        const secPass=await bcrypt.hash(req.body.password, salt)
        user=await User.create({
            docex_id: req.body.docex_id,
            password: secPass
        })
        
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET)
        success=true
        res.json({success, authtoken})
    }
    catch(error){
        res.status(500).send("Some error occured !!!")
    }
});

router.post("/login", [
    body("docex_id", "Please enter a valid docex_id").exists(),
    body("password", "Password cannot be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { docex_id, password } = req.body; // Use the correct field names

    try {
        let user = await User.findOne({ docex_id });
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authtoken });
    } catch (error) {
        console.error(error.message); // Log the error for debugging
        res.status(500).send("Internal server error");
    }
});
router.post('/getuser',fetchuser, async(req, res)=>{
    try{
        let userId=req.user.id
        const user=await User.findById(userId).select('-password')
        res.send(user)
    }
    catch(error){
        res.status(500).send("Internal Server error")
    }
})
module.exports = router;
