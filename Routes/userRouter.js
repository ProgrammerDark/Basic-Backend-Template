const express = require('express');
const { Signup, Login, AllUsers } = require('../Controller/userController');
const isAuthenticated = require('../middleware/jwt');
const validation = require('../helper/validator');
const path = require('path');
const router = express.Router();

router.get('/signup', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/signup.html'));
        console.log('Serving signup successfully');
    } catch (error) {
        console.error('Error serving signup page:', error);
    }
});

router.get('/login', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/login.html'));
        console.log('Serving login successfully');
    } catch (error) {
        console.error('Error serving login page:', error);
    }
});

router.post("/Login", Login);
router.post("/Signup", validation, Signup);
router.get('/find', isAuthenticated, AllUsers);

module.exports = router;
