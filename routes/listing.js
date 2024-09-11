const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js") // require the exported module
const {validateListing,isOwner,isLoggedIn}=require("../middleware.js");
const listingController=require("../controllers/listing.js")
const multer=require('multer')
const upload=multer({dest:'uploads/'})



router
    .route("/")
    // Index Route get /Listings for showing all cards
    .get(wrapAsync(listingController.index))
    //create Route
    .post(isLoggedIn,validateListing,wrapAsync(listingController.createListing))

// New & create Route 
router.get("/new",isLoggedIn,listingController.renderNewForm);


router
    .route("/:id")
    // Show route /listing/:id
    .get(wrapAsync(listingController.showListing))
    //update
    .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
    // Delete Route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))


// Edit 
router.get("/:id/edit",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.renderEditForm));

module.exports=router;