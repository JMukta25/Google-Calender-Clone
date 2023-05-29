const router=require("express").Router()
var Todo=require("../models/User")
router.post("/register", (req,res)=>{
  

 
    const newTodo=new Todo(req.body)
    Todo.findOne({ email: req.body.email})
    .then(user =>{
      if(user){
        console.log("user exist");
  
        res.json({ error: null, message: "Already exist" });// This will be added in response so 
        // at client side I have to check if response.message=='Already exist'
        
      }else{
        newTodo.save()
        .then(()=>{
          req.flash('msg', 'User Registered Sucessfully')
          
            res.redirect('/login');
         
           
            
         
           
           
        })
        .catch((err)=>{
            throw  err;
        })
  
      }
  
    })
    .catch((err)=>{
       throw err;
    });
    
  
    console.log(req.body.email);
    
     console.log("In post ")
      
  // const newTodo=new Todo(req.body)
  // Todo.findOne({ email: req.body.email})
  // .then(user =>{
  //   if(user){
  //     console.log("user exist");
  //    // req.flash('success','User Registered Sucessfully')

  //     res.json({ error: null, message: "Already exist" });// This will be added in response so 
  //     // at client side I have to check if response.message=='Already exist'
      
  //   }else{
  //     newTodo.save()
  //     .then(()=>{
  //      const message= req.flash('success','User Registered Sucessfully')
  //        console.log("Successfullyrs")
  //        res.render("login",{message});
         
  //     })
  //     .catch((err)=>{
  //         throw  err;
  //     })

  //   }

  // })
  // .catch((err)=>{
  //    throw err;
  // });
  

  // console.log(req.body.email);
  
  //  console.log("In post ")
    
  });

  
  
  
  
   
  
//    console.log(req.body);
   

   
   
   
   module.exports=router;