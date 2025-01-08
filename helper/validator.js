const valiation = async (req, res, next) => {
    try {
        const { userName, password, email} = req.body;
        if(!validator.isLength(userName, { min: 7, max: 30})){
            return res.status(400).json({ error: 'Username must be between 7 to 30 characters' });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ error: 'Email is not valid' });
        }
        // if(!validator.isLength(password, { min: 7, max: 30})){
        //     return res.status(400).json({ error: 'Password must be between 7 to 30 characters' });
        // }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({ error: 'Password must contain atleast one uppercase, one lowercase, one number and one special character' });
        }
    } catch (error) {
        console.error('Error in validation:', error);
        res.status(500).json({ message: 'error validating user' });
    }
}