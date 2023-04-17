var mongoose=require('mongoose');
var dbUrl='mongodb+srv://Abhir:abhi2511@todo.a2enl6a.mongodb.net/todo?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
// Create a schema-this isnlike a blueprint
var todoSchema=new mongoose.Schema({

item: String,
_id: {
    type: mongoose.Types.ObjectId, // define the _id field as an ObjectId
    required: true,
    auto: true
  }
});
module.exports=new mongoose.model("todo",todoSchema)