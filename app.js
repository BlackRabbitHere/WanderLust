if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}

console.log(process.env.SECRET);
const express= require("express");
const app=express();
const mongoose = require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON data
const session = require("express-session")
const flash= require("connect-flash");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const passport= require("passport")
const LocalStrategy= require("passport-local")
const User = require("./models/user.js")

const userRouter = require("./routes/user.js");


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

    // app cookies
const sessionOptions={
    secret:"mysupersecretcode",
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 *60 *1000,
        maxAge:7 * 24 * 60 *60 *1000,
        httpOnly: true,
    }   
};

app.get("/",(req,res)=>{
    res.send("port is working");
})

app.use(session(sessionOptions)); // to use sessions
app.use(flash()); // flash should be required before routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // to serialize user related info for not logging again
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; // storing the current user id everytime
    next();
})  

// app.get("/demouser", async (req,res,next)=>{
//     // try{
//     let fakeUser = new User({
//         email:"student1234@gmail.com",
//         username:"hello123",
//     })
//     let registerUser= await User.register(fakeUser,"helloworld") // contains username email and password
//     res.send(registerUser);
//     // } catch(err){
//     //     next(err)
//     // }
// })

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/user",userRouter);

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



