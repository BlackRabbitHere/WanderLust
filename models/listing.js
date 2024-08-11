const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image: {
        url:String,
        filename:String,
        // default:"https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww",
        // set:(v) => v===""?"https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww":v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;
