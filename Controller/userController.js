const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// Register user
const Signup = async (req, res) => {
    try {
        console.log('Signup request recieved:', req.body)
        const { userName, password, email } = req.body;
        //check if username, password and email already exist
        if (!userName || !password || !email) {
            console.log('MIssing fields:', { userName, password, email});
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password Hashed Successfully')
        //create new user object and save to database  (use mongoose schema)  //User.js model is required for this operation  //mongoose will automatically add timestamps and version key fields to the document
        const user = new User({ 
            userName,
            password: hashedPassword,
            email 
          });
        await user.save();
        console.log('User saved successfully', user)  //This will print the saved user document in the console, showing the fields we've defined in the User schema
        return res.status(201).redirect('/api/v1/users/login')
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const Login = async (req, res) => {
    try {
        console.log('Login request recieved:', req.body);
        const { username: userName, password, email } = req.body;
        //checks if the username or email field is provided
        if (!userName && !email) {
            console.log('Missing username or email');
            return res.status(400).json({error: "Please provide either email or username"})
        }

        if(!password){
            console.log('Missing password');
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        //check if username exists in the database
        const user = await User.findOne({ email })
        if (!user) {
            console.log('User not found', {userName, email});            
            return res.status(404).json({ error: 'User not found' });
        }
        //compare the hashed password with the one stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Comparing password')
        if (!isMatch) {
            console.log('Invalid Password for user');            
            return res.status(401).json({ error: 'Invalid password' });
        }
        const payload = {
            id: user.id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
        console.log('User logged in successfully', {userName,email, password, token});
        
        return res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(400).json({ error: "Internal server error" });
    }
}

const AllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log('fetched all users from the database:', users.length, "\n", users);
        return res.status(200).json({ users });
    } catch (error) {
        console.log('Error in fetching users:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    Signup,
    Login,
    AllUsers
};
