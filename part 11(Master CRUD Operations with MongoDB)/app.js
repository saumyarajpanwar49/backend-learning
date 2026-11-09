const express = require('express'); 
const app = express();

const userModel = require('./usermodel');

app.get('/' , (req,res) => {
    res.send('hey');
})

app.get('/create' , async (req,res) => {
    let createduser = await userModel.create({//ye asynchronous hai
        name : "Saumyaraj Singh Panwar",
        email : "saumyarajpanwar@gmail.com",
        username : "saumyaraj"
    })
    res.send(createduser);
})
app.get('/read' , async (req , res) => {
    let readuser = await userModel.find({name: "Saumyaraj Singh Panwar"})//userModel.find() --> isse sare read ho jate hai   but for perticular  userModel.find({:""});
    //find always returns an array anf findOne return object not array
    res.send(readuser);
})
app.get('/update' , async (req , res) => {
    let updateduser = await userModel.findOneAndUpdate({username : "saumyaraj"} , {name :"Shouryaraj"} , {new : true})//userModel.findOneAndUpdate({findone} , {update} , {new : true})
    res.send(updateduser);
})
app.get('/delete' , async (req , res) => {
    let deleteuser = await userModel.findOneAndDelete({name :"Shouryaraj"})//userModel.findOneAndDelete({:""})
    res.send(deleteuser);
})
app.listen(3000)