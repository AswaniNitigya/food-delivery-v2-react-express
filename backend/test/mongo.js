import mongoose from "mongoose" 
import dotenv from "dotenv" 
dotenv.config()
const uri = process.env.MONGO_TEST_URI
const connectMDB = async () => {
    try {
        const result = await mongoose.connect(uri)
        console.log("connected");
        
    } catch (error) {
        console.log(error);
    }
    

};

export default connectMDB