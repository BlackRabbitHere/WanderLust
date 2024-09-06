const express=require("express");
const router=express.Router();

// router.use(express.json());

//Index - users
router.get("/:id",(req,res)=>{
    res.send("GET for show users");
})

// Post - users
router.post("/",(req,res)=>{
    res.send("Post for post");
})

// Delete - users
router.delete("/:id",(req,res)=>{
    res.send("DELETE for post id");
})


module.exports=router;