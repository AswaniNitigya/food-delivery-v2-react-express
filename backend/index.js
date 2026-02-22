import express from "express" 
const app = express()
import dotenv from "dotenv" 
dotenv.config()
import cors from "cors" 
const port = process.env.PORT || 8000

import connectDB from "./config/db.connect.js"
connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})); 

import authRouter from "./routes/auth.routes.js"

app.use(express.json()) // convert data received by backend in to json format 
app.use("/api/auth", authRouter)

app.get("/",(req,res)=>{
    res.send("Server is running")
})
app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
})
 