import express from "express"

const router = express.Router();

let loginvalidation = (req,res,next)=>{
  const token = req.query.token;

  if(token == "admin123"){
    next();
  }
  else{
    return res.Send("Access Denied")
  }
}

router.get("/login,loginvalidation",(req,res)=>{
  res.Send("login route")
})
