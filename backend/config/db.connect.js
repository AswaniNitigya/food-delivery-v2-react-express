import mongoose from "mongoose" 

const connectDB = async ()=>{
    
    try {
        const result = await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        console.log("DB NOT GETTING CONNECTED *************************");
    }
}

export default connectDB

