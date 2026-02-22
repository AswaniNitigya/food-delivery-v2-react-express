
import dotenv from "dotenv" 
dotenv.config()
import cors from "cors" 
import express, { json } from "express" 
const app = express()

//test
import connectMDB from "./test/mongo.js"
import TestUser from "./test/models/test.models.js"
connectMDB();
app.use(express.json())
const port = process.env.PORT || 8000
app.use(cors())
app.get("/",(req,res)=>{
    res.send(`<p>Server started on PORT <h1>${port}</h1></p>`)
})
app.get("/api",(req,res)=>{
    res.json({name:"nitigya"})
})

app.post("/connect",async (req,res)=>{
    try {
       const {email,password} = req.body
       TestUser.create({
        email,
        password
       })
    } catch (error) {
        console.log(error);
    }
})


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}/`);
    
})