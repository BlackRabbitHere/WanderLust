const express=require("express");
const router=express.Router({mergeParams:true});  // use to send id to the /listing/:id/review
const wrapAsync=require("../utils/wrapAsync.js");
const review=require("../models/reviews.js");
const Listing=require("../models/listing.js") // require the exported module
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")

//Reviews
//Post Review Route
router.post("/",validateReview, isLoggedIn,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports=router;