const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const{ check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('config'); 


// @route POST api/auth
// @desc Authorize user
// @access Public
router.get('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({ msg: 'User with this email does not exist.' });
    
        const isMatched = await bcrypt.compare(password, user.password)
    
        if(!isMatched) return res.status(400).json({ msg: 'Incorrect Password' });   

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 3600000,
        }, (err, token) => {
            if(err) throw err;
            res.status(200).json({ token });
        });
    }catch (err) {
        console.log('Error', err.message);
        res.status(500).json({ msg: 'Server Error' });
    }

    res.status(200).json({ msg: "Auth Api" })
})

module.exports = router;