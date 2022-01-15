const mongoose = require("mongoose");

async function initializeDbConnection() {

  const dbURI = process.env['dbURI'];

  try {
      const mongooseConnection = await mongoose.connect(dbURI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true, // ensureIndex deprecation warning
        autoIndex: true
      });

      if(mongooseConnection) {
        console.log('mongoose connected');
      }
    
  }catch(err) {
    console.log("mongoose connection failed", err);
  }
}

module.exports = { initializeDbConnection };