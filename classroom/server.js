const express=require("express");
const app=express();
const users=require("./Routes/user");
const posts=require("./Routes/post.js");
const session=require("express-session");
const flash=require("connect-flash")
const path=require("path")
app.set("view-engine","ejs");
app.use(express.static(path.join(__dirname,"/public")));
// npm connect-flash 
const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
}

// expression-session on npm
//connsect flash package for flash messages of update or delete messages
app.use(session(sessionOptions));
app.use(flash()) // writing this will flash the messages;

app.use((req,res,next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
   
    if(name==="anonymous"){
        req.flash("error","user not registered")
    }
    else{
        req.flash("success","user registered successfully")// flash will contain two words first is key and second one is the message
    }
    console.log(req.session.name);
    // console.log(req.session);
    res.redirect("/hello");
})

app.get("/hello", (req,res)=>{
    // res.send(`hello ${req.session.name}`);
    // console.log(req.flash("success"));
    // res.locals.successMsg = req.flash("success");
    // res.locals.errorMsg = req.flash("error");
    res.render("page.ejs",{name:req.session.name});
    // res.render("page.ejs",{name:req.session.name, msg:req.flash("success")});
})

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//     req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// })

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})













// const users=require("./Routes/user.js");
// const posts=require("./Routes/post.js");
// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-In","India",{signed:true})
//     res.send("signed cookie sent");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// //use of express router

// app.get("/getcookies",(req,res)=>{
//     // res.cookie("greet","hello"); // name value pair
//     // res.cookie("madeIn","India");
//     res.send("send you some cookies");

// })

// app.get("/greet",(req,res)=>{
//     // let {name="anony"}=req.cookies;
//     // res.send(`Hi ${name}`);
// })


// app.get("/",(req,res)=>{
//     // console.dir(req.cookies);
//     res.send("Hi, I am root!");
// });

// app.use("/users",users);

// app.use("/posts",posts);

