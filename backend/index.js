import dotenv from "dotenv" 
dotenv.config()
import cors from "cors" 
import express, { json } from "express" 
const app = express()
const port = process.env.PORT || 8000
app.use(cors())
app.get("/",(req,res)=>{
    res.send(`<p>Server started on PORT <h1>${port}</h1></p>`)
})
app.get("/api",(req,res)=>{
    res.json({name:"nitigya"})
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}/`);
    
})