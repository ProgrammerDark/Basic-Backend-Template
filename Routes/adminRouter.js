const express = require('express');
const { adminSignup, adminLogin } = require('../Controller/adminController');
const router = express.Router();

router.post('/adminSignup', adminSignup)
router.post('/adminLogin', adminLogin)