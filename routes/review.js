const express=require("express");
const router=express.Router({mergeParams:true});  // use to send id to the /listing/:id/review
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../Schema.js")
const review=require("../models/reviews.js");
const Listing=require("../models/listing.js") // require the exported module


const validateReview=(req,res,next)=>{
    // let result=listingSchema.validate(req.body);
    // console.log(result);
    let {error}=reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//Reviews
//Post Review Route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
    // console.log("new review saved");
    // res.send("new Review Saved");
}))

//Delete Review Route
router.delete("/:reviewId",wrapAsync (async(req,res)=>{
    let {id,reviewId}=req.params;
    Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}))

module.exports=router;