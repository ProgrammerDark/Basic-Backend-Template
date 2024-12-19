const express = require('express');
const env = require('dotenv').config()
const path = require('path');
const app = express()     
const port = process.env.PORT || 3000;
const DB = require('./Database/db')
const userRouter = require('./Routes/userRouter');

app.use(express.json());
app.use('/api/v2/users', userRouter);
app.use(express.static(path.join(__dirname, 'views')));
//import Database connection
DB()
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'))
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

