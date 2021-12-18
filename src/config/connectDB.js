import mongoose from "mongoose";
import bluebird from "bluebird"; //thư viện hỗ trợ cho viết Promise 

/* Connect to MongoDB*/
let connectDB = () => {
  mongoose.Promise = bluebird;

  //mongodb://localhost:27017/chat
  // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  
  let URI = `mongodb+srv://tantoan:tantoan147@chataws.wn1ed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  return mongoose.connect(URI);
};

module.exports = connectDB;
