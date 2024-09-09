const express=require("express");
const router=express.Router({mergeParams:true});  // use to send id to the /listing/:id/review
const wrapAsync=require("../utils/wrapAsync.js");
const review=require("../models/reviews.js");
const Listing=require("../models/listing.js") // require the exported module
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")


//Reviews
//Post Review Route
router.post("/",validateReview, isLoggedIn,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new review(req.body.review);
    newReview.author = req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing._id}`);
    // console.log("new review saved");
    // res.send("new Review Saved");
}))

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync (async(req,res)=>{
    let {id,reviewId}=req.params;
    Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
}))

module.exports=router;