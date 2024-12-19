const express = require('express');
const {Signup, Login} = require('../Controller/userController');
const path = require('path');

const router = express.Router()

router.get('/signup', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/signup.html'));
        console.log('Serving signup sucessfully');
    } catch (error) {
        console.error('Error serving signup page:', error);       
    }
});

router.get('/login', (req,res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/login.html'));
        console.log('Serving login sucessfully');
    } catch (error) {
        console.error('Error serving login page:', error);
    }
});

router.post("/Login",Login)
router.post("/Signup", Signup)

module.exports = router
