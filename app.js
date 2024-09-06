const express= require("express");
const app=express();
const mongoose = require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON data


const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");


app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
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

app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);

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



