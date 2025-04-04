const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const  jwt = require('jsonwebtoken');
const config = require('../config/default.json')
const { check,body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { Promise } = require('mongoose');


// @route   POST api/users
// @desc    Register a user
// @acess   Public   
router.post('/', [

check('name', 'Please add a name ').not().isEmpty(),
check('email', 'Please include a valid email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6})
], 
  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
    }
    const { name, email, password } = req.body;
   
    try{
    let user = await  User.findOne({email});

    if(user){
        return res.status(400).json({msg: 'User already exists'});
    }
    user = new User({name, email, password});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
   
    const payload = {
        id : user.id
   }

   jwt.sign(payload, config.jwtSecret, {
    expiresIn : 360000
   },
   (err, token)=> {
    if (err) throw err;
    res.json({token});
   }
)

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

const generateResetToken = async () => {
    const resetToken = crypto.randomBytes(3).toString('hex');
    const hashedToken =crypto
     .createHash('sha256')
     .update(resetToken)
     .digest('hex')
 
    
     return { resetToken, hashedToken };

}

const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: false,
    auth : {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    },
    tls: {
       rejectUnauthorized: false
    }

});

// Route for forget  Password
router.post('/forgot-password',
    [
        // Validate the email format using express-validator
        body('email').isEmail().withMessage('Invalid Email Format')
    ],
     async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;
       
        const user = await User.findOne({ email });

        if(!user){
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.json({
                message: 'If a user with this email exists, a verification code will be sent'
            });
        }
        const { resetToken, hashedToken } = await generateResetToken();
        user.resetToken = hashedToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        await user.save();

        await transporter.sendMail({
            from: config.EMAIL_FROM,
            to: email,
            subject: 'Password Reset Verification Code',
            html: `
            <h2>Password Reset Verification Code</h2>
            <p>Your verification code is : </p>
            <h1 style="font-size: 24px; letter-spacing: 2px; color: #007AFF">${resetToken}</h1>
            <p>This Code will expire in 1 hour.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            `
        });
        res.json({
            message: 'Verification code sent successfully',
            email: user.email,
        });
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({error: 'An error occurred while processing your request'})
    }
})

router.post('/reset-password',[
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6}),

], async (req, res) => {
    try{
        const { email, token, newPassword} = req.body;

        if(!email || !token || !newPassword){
            return res.status(400).json({error: 'All fields are required'})
        }

        const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
       
       
        const user = await User.findOne({
            email: email,
            resetToken: hashedToken,
            resetTokenExpiry: {$gt: Date.now()}
        });

        if(!user){
            return res.status(400).json({error: 'Invalid or expired verification code'});
        }
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiry= undefined;
        user.tokenVersion = (user.tokenVersion || 0) + 1;
       
        await user.save();

        res.json({
            success: true,
            message: 'Password reset successful'
        });
    }
    catch(err){
        console.error('Reset password error:' ,err);
        res.status(500).json({error: 'An error occurred while resetting the password'});

    }
}

);

module.exports = router;