const router=require("express").Router()
var Todo=require("../models/Todo")
//routes will be here

router.get("/", async(req,res)=>{
 const allTodo= await Todo.find();

 res.render('todo',{todo:allTodo})

})

module.exports=router;