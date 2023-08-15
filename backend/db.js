const mongoose = require("mongoose");

async function connectToMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
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
