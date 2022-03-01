const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const{ check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('config'); 


// @route POST /api/users
// @desc Add new User
// @access Public
router.post('/', [
    check('name', 'Please enter a name of almost 3 charaters').not().isEmpty().isLength({ min: 3 }),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Enter password between 5 - 20 charaters').not().isEmpty().isLength({ min: 5, max: 20 })
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { name, email, password } = req.body;

    const user = new User({
        name,
        email,
        password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)

    try { 
        await user.save()
        
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

    } catch(err) {
        console.log("Error", err.message);
        res.status(500).json({ msg: 'Server Error' })
    }

    res.status(200).json({ msg: "Users APIs" })
})

module.exports = router;