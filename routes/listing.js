const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js") // require the exported module
const {validateListing,isOwner,isLoggedIn}=require("../middleware.js");
const listingController=require("../controllers/listing.js")


// Index Route get /Listings for showing all cards
router.get("/",wrapAsync(listingController.index));

// New & create Route 
router.get("/new",isLoggedIn,listingController.renderNewForm);


//create Route

router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing))

// Show route /listing/:id
router.get("/:id",wrapAsync(listingController.showListing));


// Edit 
router.get("/:id/edit",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.renderEditForm));


//Update
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))


module.exports=router;