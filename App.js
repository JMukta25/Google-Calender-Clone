 var express=require('express');
 
 var app=express();
 // static files
 // return a static file when directed to a particular route
 app.use('/public',express.static('public'));
  
  var session=require('express-session');
  var flash=require('connect-flash');
 app.use(express.urlencoded({extended:true}));

app.use(session({
   secret:'todoproject',
   cookie: {maxAge:60000},
   saveUninitialized:false,
   resave:false

}));
app.use(flash());
 //set up template engine
 app.set('view engine','ejs')
//  var todoController=require('./Controller/todoController');
 // fire controllers
 // Our todoController just returns a function which is stored in var and we are firing it
//  todoController(app)

//routes

 //Listen to port
 app.listen(3000);
 
 
 app.use(require("./routes/index"))
 app.use(require("./routes/register"))
 app.use(require("./routes/todo"))
 app.use(require("./routes/login"))
 app.use(require("./routes/history"))

 console.log('You are listening to port 3000')


