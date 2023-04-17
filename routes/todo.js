const router=require('express').Router()
var Todo=require("../models/Todo")
//routes
router.post("/add/todo",(req,res)=>{
   
 
   const newTodo=new Todo(req.body)
   console.log(req.body)
   newTodo.save()
   .then(()=>{
      console.log("Successfullyrs")
      res.redirect("/");
   })
   .catch((err)=>{
      console.log(err);
   })
   
   
});

router.get("/delete/todo/:_id",(req,res)=>{
   const {_id}=req.params;
   Todo.deleteOne({_id})
   .then(()=>{
      console.log("Deleted To do Sucessfully");
      res.redirect("/");
   })
   .catch((err)=>{
      console.log(err);
   })

})

module.exports=router;