
const router=require('express').Router();
var Todo=require("../models/User")
var express=require('express');
const moment = require('moment');

var app=express();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');



const axios = require('axios');

router.get('/login',(req,res)=>{

    
       
        const message = req.query.message;
        res.render('login', { message: req.flash('msg') });
        
        
    
    
})


    router.post('/login',async (req,res)=>{
        try {
            const user = await Todo.findOne({
                $and: [
                    { email : req.body.email},
                    { password:req.body.password }
                ]
            });
          //  console.log("user"+user);
            if(user && user.todolist ) {
                const todayDate = new Date();
             const todoList= user.todolist.map((todo)=>{
                const date = moment(todo[1]);
                const formattedDate = date.format("YYYY-MM-DDTHH:mm:ss");
                const convertedDate = new Date(formattedDate);
                convertedDate.setHours(23);
                convertedDate.setMinutes(59);
                convertedDate.setSeconds(59);
                console.log(convertedDate);
                if(convertedDate.getDate()==todayDate.getDate()){
                    return todo;
                }
              });
               
                 
                res.render('todo.ejs', { ID: user._id, todo: todoList,name:user.username });
            } else {
               // console.log("IN else of login")
              
                res.redirect("/login");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
        
        });




module.exports=router;