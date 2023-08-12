
exports.getHealthCheck=async(req,res)=>{
  try{
    return res.json({status: "OK"})

  }catch(error){
    return res.json({ status: `Health check error: ${error}`})
  }
  }