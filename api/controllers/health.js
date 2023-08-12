
exports.getHealthCheck=async(req,res)=>{
  try{
    return res.json({status: "OK"})

  }catch(error){
    return res.json({ error: `Health check error: ${error}`})
  }
  }