const router=require('express').Router()
var Todo=require("../models/User")
const sendMailUsers=require('../sendMailUsers.js');
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');
  const schedule = require('node-schedule');
  const moment = require("moment");

//routes
let user;
router.post("/add/todo/:_id",async (req,res)=>{
   try {
      let status="not set"
      const {_id}=req.params;
       user = await Todo.findOne({_id});
      if(user  && user.todolist) {
         let date=new Date();
    let str=(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()).toString();
    console.log("Date String"+str);
   
   eachItem=[];

   eachItem.push(req.body)
   eachItem.push(str)
   eachItem.push(status)
  
         
         user.todolist.push(eachItem);

         user.save();
         res.render('todo.ejs', { ID: user._id, todo: user.todolist,name:user.username });
      } else {
          res.redirect("/login");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
  }  
});
router.post("/mail/todo/:_id/:_item",async (req,res)=>{
  
   try{
      const {_id,_item}=req.params;
      const{reminder}=(req.body);
      console.log(reminder);
      user=await Todo.findOne({_id});
      // console.log("user"+user);
      // console.log("item"+_item);
      if(user && user.todolist){
      // console.log('found');
    
     user.todolist.forEach(todo=>{
       if(_item==todo[0].item){
        todo.push(reminder);
       // console.log(todo[2]);
       }
      });
      const query = { todolist:user.todolist};
      const updateDocument = {
        $set: { "todolist": user.todolist }
      };
      const result = await user.updateOne(query, updateDocument);
  
      
      
       res.render('todo.ejs',{ ID: user._id, todo: user.todolist,name:user.username})
      sendMailUsers(user.email,_item,reminder,_id);
     
   
 
      }
   }
   catch(error){
    console.error(error);
    res.status(500).send('Internal Srever Error');
   }





}
);
router.get("/delete/todo/:_id/:_item",async(req,res)=>{
 console.log("In delete");
   try {
      
      const {_id,_item}=req.params;
     
     
      user = await Todo.findOne({_id});
      if(user  && user.todolist) {
      const arr=user.todolist;
     let str=_item;
     var i;
      for( i=0;i<arr.length;i++){
         if(arr[i][0].item==str){
            const jobId=arr[i][4];
            if(jobId){
               schedule.cancelJob(jobId);
            }
           
            break;
         }
      }
      for(var j=i;j<arr.length ;j++) {
         if(j+1<arr.length){
            arr[j][0].item=arr[j+1][0].item;
            arr[j][1]=arr[j+1][1];
         }
      }
      arr.pop();
     // console.log(arr);
      user.todolist=arr;
      
         
      const query = { todolist:user.todolist};
      const updateDocument = {
        $set: { "todolist": arr }
      };
      const result = await user.updateOne(query, updateDocument);
  
  
         
         
         // user.save();
          res.render('todo.ejs', { ID: user._id, todo: arr,name:user.username });
      } else {
          res.redirect("/login");
      }

     
      
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
  }
 

})

module.exports=router;