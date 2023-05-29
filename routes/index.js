const router=require("express").Router()
var Todo=require("../models/Todo")
var Todo1=require("../models/User")
const axios = require('axios');
// routes will be here

router.get("/home", async(req,res)=>{
 const allTodo= await Todo.findOne({email:req.body.email});
 console.log("This is todo list");
 

})

router.get("/", (req,res)=>{


 res.render('register')
 
})

module.exports=router;