 var express=require('express');
 var app=express();
 // static files
 // return a static file when directed to a particular route
 app.use('/public',express.static('public'));

 app.use(express.urlencoded({extended:true}));


 //set up template engine
 app.set('view engine','ejs')
//  var todoController=require('./Controller/todoController');
 // fire controllers
 // Our todoController just returns a function which is stored in var and we are firing it
//  todoController(app)

//routes

 //Listen to port
 app.listen(3000);
 const myMiddleware1 = (req, res, next) => {
   return require("./routes/index")
  };

  const myMiddleware2 = (req, res, next) => {
    return require("./routes/todo")
   };
 
 var second=require("./routes/todo");
 app.use(require("./routes/index"))
 app.use(require("./routes/todo"))
 console.log('You are listening to port 3000')


