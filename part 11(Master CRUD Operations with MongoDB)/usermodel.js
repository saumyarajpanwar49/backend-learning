const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);
const userSchema = mongoose.Schema({
    name : String,
    username : String,
    email : String
});//it is a method which accepts OBJECT

module.exports = mongoose.model("user" , userSchema);//mongoose.model("name" , NameSchema) ---> creating model because you can not do CRUD operation without model
