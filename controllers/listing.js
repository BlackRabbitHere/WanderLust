const Listing = require("../models/listing")
const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding')
const mapToken=process.env.MAP_TOKEN;
const geocodingClient= mbxGeocoding({accessToken:mapToken})


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
    let response=await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit:1
    })
    .send()
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
    // try{
    let listing=req.body.listing; //as we have added listing[name] in it
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid data for  listing")
    // }
    const newListing= new Listing(req.body.listing)
    // console.log(req.user);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    let savedListing=await newListing.save();
    req.flash("success","New Listing Created!");
    console.log(savedListing);
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
    // console.log(listing);
    let originalImageUrl=listing.image.url
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});

}


module.exports.updateListing = async (req,res,next)=>{
    let {id}= req.params;
    
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for  listing")
    }
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file != "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    }
    await listing.save();
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

module.exports.filter = async (req, res, next) => {
    let { id } = req.params;
    let allListing = await Listing.find({ category: { $all: [id] } });
    console.log(allListing);
    if (allListing.length != 0) {
      res.locals.success = `Listings Find by ${id}`;
      res.render("listings/index.ejs", { allListing });
    } else {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
    }
  };

  module.exports.search = async (req, res) => {
    console.log(req.query.q);
    let input = req.query.q.trim().replace(/\s+/g, " "); // remove start and end space and middle space remove and middle add one space------
    console.log(input);
    if (input == "" || input == " ") {
      //search value empty
      req.flash("error", "Search value empty !!!");
      res.redirect("/listings");
    }
  
    // convert every word 1st latter capital and other small---------------
    let data = input.split("");
    let element = "";
    let flag = false;
    for (let index = 0; index < data.length; index++) {
      if (index == 0 || flag) {
        element = element + data[index].toUpperCase();
      } else {
        element = element + data[index].toLowerCase();
      }
      flag = data[index] == " ";
    }
    console.log(element);
  
    let allListing = await Listing.find({
      title: { $regex: element, $options: "i" },
    });
    if (allListing.length != 0) {
      res.locals.success = "Listings searched by Title";
      res.render("listings/index.ejs", { allListing });
      return;
    }
    if (allListing.length == 0) {
      allListing = await Listing.find({
        category: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListing.length != 0) {
        res.locals.success = "Listings searched by Category";
        res.render("listings/index.ejs", { allListing });
        return;
      }
    }
    if (allListing.length == 0) {
      allListing = await Listing.find({
        country: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListing.length != 0) {
        res.locals.success = "Listings searched by Country";
        res.render("listings/index.ejs", { allListing });
        return;
      }
    }
    if (allListing.length == 0) {
      let allListing = await Listing.find({
        location: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListing.length != 0) {
        res.locals.success = "Listings searched by Location";
        res.render("listings/index.ejs", { allListing });
        return;
      }
    }
    const intValue = parseInt(element, 10); // 10 for decimal return - int ya NaN
    const intDec = Number.isInteger(intValue); // check intValue is Number & Not Number return - true ya false
  
    if (allListing.length == 0 && intDec) {
      allListing = await Listing.find({ price: { $lte: element } }).sort({
        price: 1,
      });
      if (allListing.length != 0) {
        res.locals.success = `Listings searched for less than Rs ${element}`;
        res.render("listings/index.ejs", { allListing });
        return;
      }
    }
    if (allListing.length == 0) {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
    }
  };
  