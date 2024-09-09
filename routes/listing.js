const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js") // require the exported module
const {validateListing,isOwner,isLoggedIn}=require("../middleware.js");



// Index Route get /Listings for showing all cards
router.get("/",wrapAsync(async (req,res,next)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

// New & create Route 

router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
    
})



//create Route

router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    // try{
    let listing=req.body.listing; //as we have added listing[name] in it
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid data for  listing")
    // }
    const newListing= new Listing(req.body.listing)
    console.log(req.user);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    console.log(req.flash)
    res.redirect("/listings");
    console.log(listing);
    // }catch(err){
    //     next(err);
    // }


}))

// Show route /listing/:id

router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",populate:{ path:"author"}})
    .populate("owner");// populate is used for getting reviews data in show ejs
    console.log("listing");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}))


// Edit 
router.get("/:id/edit",isLoggedIn,isOwner,validateListing,wrapAsync(async (req,res,next)=>{
    let { id }=req.params;
    console.log(id);
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/edit.ejs",{listing});

}))

//Update

router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req,res,next)=>{
    let {id}= req.params;
    
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for  listing")
    }
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}))

// Delete Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    console.log(deleteListing);
    res.redirect("/listings");
}))




module.exports=router;