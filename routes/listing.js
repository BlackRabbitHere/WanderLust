const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../Schema.js")
const Listing=require("../models/listing.js") // require the exported module


const validateListing=(req,res,next)=>{
    // let result=listingSchema.validate(req.body);
    // console.log(result);
    let {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


// Index Route get /Listings for showing all cards
router.get("/",wrapAsync(async (req,res,next)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

// New & create Route 

router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
    
})



//create Route

router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
    // try{
    let listing=req.body.listing; //as we have added listing[name] in it
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid data for  listing")
    // }
    const newListing= new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listings");
    console.log(listing);
    // }catch(err){
    //     next(err);
    // }


}))

// Show route /listing/:id

router.get("/:id",wrapAsync(async(req,res,next)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id).populate("reviews");// populate is used for getting reviews data in show ejs
    res.render("listings/show.ejs",{listing});
}))


// Edit 
router.get("/:id/edit",validateListing,wrapAsync(async (req,res,next)=>{
    let { id }=req.params;
    console.log(id);
    const listing=await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs",{listing});

}))

//Update

router.put("/:id",validateListing,wrapAsync(async (req,res,next)=>{
    let {id}= req.params;
    
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for  listing")
    }
    // console.log(req.body.listing.image.url);
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}))

// Delete Route
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}))




module.exports=router;