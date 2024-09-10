const Listing = require("../models/listing")


module.exports.index = async (req,res)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req,res,next)=>{
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
}


module.exports.createListing = async(req,res,next)=>{
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

}


module.exports.renderEditForm = async (req,res,next)=>{
    let { id }=req.params;
    console.log(id);
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/edit.ejs",{listing});

}


module.exports.updateListing = async (req,res,next)=>{
    let {id}= req.params;
    
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for  listing")
    }
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async (req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    console.log(deleteListing);
    res.redirect("/listings");
}