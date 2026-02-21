import React from 'react'
import axios from "axios" 

function App() {
  const fetchFromBackend = async ()=>{
    try {
      const result = axios.get("http://localhost:3000/api")
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button onClick={fetchFromBackend}>Send</button>
    </div>
  )
}

export default App