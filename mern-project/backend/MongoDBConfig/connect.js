import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Is Connected ${connect.connection.host}` .bgGreen.white);
  } catch (error) {
    console.log(`MongoDB is Not Connected Because ${error}`);
  }
};

export default connectDB;
