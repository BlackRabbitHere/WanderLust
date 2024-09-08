const express= require("express");
const router = express.Router();
const User=require("../models/user"); // User model for creating a new user
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
    let {username, email, password}= req.body;
    const newUser = new User({email,username})
    const registerdUser=await User.register(newUser, password);
    console.log(registerdUser);
    req.flash("success","Welcome to Wanderlust");
    res.redirect("/listings");
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/user/signup");
    }
}))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",passport.authenticate("local",{failureRedirect:'/user/login', failureFlash:true}),async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!!")
    res.redirect("/listings")
})

module.exports=router;