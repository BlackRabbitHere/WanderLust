const express=require("express");
const router =express.Router();

// Posts
//Index 
router.get("/:id",(req,res)=>{
    res.send("GET for show post");
})

// Post - users
router.post("/",(req,res)=>{
    res.send("Post for users");
})

// Delete - users
router.delete("/:id",(req,res)=>{
    res.send("DELETE for user id");
})

module.exports=router;

