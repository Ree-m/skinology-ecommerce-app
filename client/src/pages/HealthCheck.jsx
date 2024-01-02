import { useState,useEffect } from "react"
import { API_URL } from "../constants";

const HealthCheck = () => {
    const [data,setData]=useState("")

   
    useEffect(()=>{
        async function fetchStatus(){
            const response  =await fetch(`${API_URL}/healthCheck`)
            const data =await response.json()
            setData(data.status)
        }
        fetchStatus()
    },[])
  return (
    <div>
    Health Check :{data} 
    </div>
  )
}

export default HealthCheck