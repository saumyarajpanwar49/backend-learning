const express = require('express'); 
const app = express();
const path = require('path');
app.set("view engine", "ejs");
const userModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/' , (req,res) => {
    res.render('index');
})

app.get('/read' , async(req,res) => {//after creating this route please make a file read.ejs in views 
    let allusers = await userModel.find();
    res.render('read' , {users : allusers});
})

app.get('/edit/:userid' , async(req,res) => {//after creating this route please make a file read.ejs in views 
    let Edituser = await userModel.findOne({_id:req.params.userid});
    res.render("edit" , {user:Edituser});
})

app.post('/update/:userid' , async(req,res) => {//after creating this route please make a file read.ejs in views 
    let {image , name , email} = req.body;
    let Edituser = await userModel.findOneAndUpdate({_id:req.params.userid}, {image,name,email} , {new:true});//(kisko update karna hai, kya update karna hai)
    res.redirect("/read");
})

app.get('/delete/:id' , async(req,res) => {//after creating this route please make a file read.ejs in views 
    let allusers = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
})

app.post('/create' , async(req,res) => {
    let {name,email,image} = req.body;//isse baar nhi likhna padega
    let createdUser = await userModel.create({
        name: name,//another way because LHS = RHS --->> name,email,image
        email : email,
        image : image
    });
    res.redirect("/read");
})
app.listen(3000)