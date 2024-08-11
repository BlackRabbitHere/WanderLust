const express= require("express");
const app=express();
const mongoose = require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./Schema.js")


app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const Listing=require("./models/listing.js") // require the exported module
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));


main() // Promise
    .then(()=>{
    console.log("connection Succesful");
    })
    .catch((err) => console.log(err));



app.get("/",(req,res)=>{
    res.send("port is working");
})


// Index Route get /Listings for showing all cards
app.get("/listings",wrapAsync(async (req,res,next)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

// New & create Route 

app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs");
    
})

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

// Show route /listing/:id

app.get("/listings/:id",wrapAsync(async(req,res,next)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}))

//create Route

app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
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

// Edit 
app.get("/listings/:id/edit",validateListing,wrapAsync(async (req,res,next)=>{
    let { id }=req.params;
    const listing=await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs",{listing});

}))

//Update

app.put("/listings/:id",validateListing,wrapAsync(async (req,res,next)=>{
    let {id}= req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for  listing")
    }
    // console.log(req.body.listing.image.url);
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}))

// Delete Route
app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}))

// app.get("/testListing",async (req,res)=>{
//     let sampleListing= new Listing({
//         title:"My new Villa",
//         description:"by the beach",
//         price:1200,
//         location:"Calangute , Goa",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// })

app.all("*",(rep,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"))
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something Went Wrong"}=err;
    res.status(statusCode).render("error.ejs",{err});
    // res.render("error.ejs",{err});
    // res.send("something went wrong");
})

app.listen(3000,()=>{
    console.log("server is listening to port 3000");
})



