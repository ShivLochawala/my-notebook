const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mynotebookjwtsecret';
const fetchUser = require('../middleware/fetchUser');

//ROUTE 1: Create User using: POST request "/api/auth/register". Doesn't required Auth
router.post('/register', [
    //This are Validations
    body('name', 'Invalid Name').isLength({ min: 2 }),
    body('email', 'Inavlid Email').isEmail(),
    body('password', 'Password must be 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    let success;
    //If there are errors then return status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        //Check user email ID is already exists or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, errors: [{ msg: 'This Email ID already Used' }] });
        }
        //If there is no errors then create user
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken, user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something want wrong");
    }

})

//ROUTE 2: Login User into myNotebook
router.post('/login',[
    body('email','Please Enter Valid EmailID').isEmail(),
    body('password','Please Enter Valid Password').isLength({min:5})
], async (req,res) => {
    let success;
    //If there are errors then return status 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        //Check user is valid or not
        let user = await User.findOne({email});
        
        if(!user){
            success = false;
            return res.status(400).json({ success, errors: [{ msg: 'Invalid Credentails' }] });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            success = false;
            return res.status(400).json({ success, errors: [{ msg: 'Invalid Credentails' }] });
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success,authToken,user});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something want wrong");   
    }
})

// ROUTE 3: Get loggin user details using GET: "/api/auth/get-user-details" Login required
router.get('/get-user-details', fetchUser, async (req, res) =>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something want wrong");   
    }
})
module.exports = router