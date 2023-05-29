
const router=require('express').Router();
var Todo=require("../models/User")
var express=require('express');
const moment = require('moment');

var app=express();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');



const axios = require('axios');
console.log('history');
router.get('/history/:_id', async(req,res)=>{

        const {_id}=req.params; 
        const user= await Todo.findOne({_id});
        console.log(user.todolist);
        const todayDate = new Date();
        const userTodoHistory= user.todolist.map((todo)=>{
                const date = moment(todo[1]);
                const formattedDate = date.format("YYYY-MM-DDTHH:mm:ss");
                const convertedDate = new Date(formattedDate);
                convertedDate.setHours(23);
                convertedDate.setMinutes(59);
                convertedDate.setSeconds(59);
                console.log(convertedDate);
           console.log("Today's date",todayDate)
        let   monthStartDate=new Date(convertedDate.getFullYear(),convertedDate.getMonth(),1);
       console.log(convertedDate < todayDate," ans")
      

           if(convertedDate.getDate() < todayDate.getDate()  ){// if the date of setting todo is less then current then add it to history array
              
              return todo;
           }else{
                return null; // if the entire array is null then don't render.
           }


        })
       console.log(userTodoHistory);
       let flag=0;
       userTodoHistory.forEach((todo)=>{
             if(todo==null){
                flag=1;
             }else{
                flag=0;
             }
       })
        if(flag==0){
                res.render('history.ejs',{historyList:userTodoHistory});
      
        }else{
                res.render('todo.ejs', { ID: user._id, todo: user.todolist,name:user.username });
        }
       
    
    
})

module.exports = router;