import { useState,useEffect } from "react"
const HealthCheck = () => {
    const [data,setData]=useState("")

   
    useEffect(()=>{
        async function fetchStatus(){
            const response  =await fetch(`${API_URL}/healthCheck`)
            const data =await response.json()
            setData(data)
        }
        fetchStatus()
    },[])
  return (
    <div>
{data}
    </div>
  )
}

export default HealthCheck