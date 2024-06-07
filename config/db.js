const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

const connectDb = async () => {
   try {
      const connect = await mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('Database connected');
   } catch (error) {
      console.error('Database connection error:', error);
   }
};

module.exports = connectDb;
