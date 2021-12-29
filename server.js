const path =require("path")
const express=require("express");
const { useImperativeHandle } = require("react");

let app=express()
      // app.use(express.static("./public"))
    const PORT=process.env.PORT || 3000

  app.get("*",(req,res)=>{
     res.status(200).send("<H1>OOPs PAGE NOT FOUND</H1>")
  })
  app.listen(3000,()=>{
     console.log("server working")
  })        