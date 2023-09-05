const mongoose = require("mongoose");

async function connectToMongo() {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@docex.s0w7x6d.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB!");
  }
   catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = connectToMongo;
