var Todo=require('./models/User');
const config=require('./config/config');
const nodemailer=require('nodemailer');
const cron=require('node-cron');
const schedule = require('node-schedule');
var LocalStorage = require('node-localstorage').LocalStorage
var localStorage = new LocalStorage('./localStorage');
const { v4: uuidv4 } = require('uuid');


const sendMailUsers= async (email,item,date,_id)=>{
  const transporter= nodemailer.createTransport({
    host:'smtp.gmail.com',
    post:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:'j.mukta2018@gmail.com',
        pass:'oodxmegorvpldofy'
    }
 });

 
     const mailOptions={
        from:"Mukta Joshi",
        to:email,
        subject:'Reminder',
        html:item
     }
     const jobId =uuidv4();
    //  console.log("jobId"+jobId);
    //  console.log("type "+typeof(jobId));
    
   const task= schedule.scheduleJob(jobId,date, function() {
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent');
        }
      });
    });
    //console.log(typeof(task))
    

    user= await Todo.findOne({_id});
    if(user && user.todolist){
      // console.log('found');
    console.log(typeof(user.todolist));
     user.todolist.forEach(todo=>{
       if(item==todo[0].item){
        todo[2]="set"
        todo.push(jobId);
       
       
       }
      
      });
      

    }

    const query = { todolist:user.todolist};
      const updateDocument = {
        $set: { "todolist": user.todolist }
      };
      const result = await user.updateOne(query, updateDocument);
  
  
    
      
}
module.exports=sendMailUsers;
