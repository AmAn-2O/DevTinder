const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://amandeep700933:amandeep14@cluster1.zousjbm.mongodb.net/devTinder"
  );
  //if you write mongodb.net/admin (name of your specific data base it should connected to that only but if you doesn't connected to the any specific db that it should be targeting to the whole cluster)
};

module.exports = connectDB;
