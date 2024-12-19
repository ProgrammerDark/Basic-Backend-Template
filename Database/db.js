const mongoose = require('mongoose');

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_STRING);
        console.log('Connected to MongoDB Database');
    } catch (error) {
        console.log('Failed to connect to MongoDB Database' + error);
    }
}
module.exports = DB;