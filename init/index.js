const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing=require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";



main() // Promise
    .then(()=>{
    console.log("connection Succesful");
    })
    .catch((err) => console.log(err));

    
async function main() {
        await mongoose.connect(MONGO_URL);
      }


// const initDB= async ()=>{
//     await Listing.deleteMany({});
//     initData.data=initData.data.map((obj)=>({...obj, owner:"66dbf0fba7387185f801b4ca"}))
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
// }
let categoryAll = [
	"Trending",
	"Rooms",
	"Iconic Cities",
	"Mountains",
	"Castle",
	"Amazing Pools",
	"Farms",
	"Camping",
	"Arctic",
	"Dome",
	"Boat",
];

const initDB = async () => {
	await Listing.deleteMany({});
	initData.data = initData.data.map((obj) => ({
		...obj,
		owner: "66dbf0fba7387185f801b4ca",
		price: obj.price * 25,
		category: [
			`${categoryAll[Math.floor(Math.random() * 11)]}`,
			`${categoryAll[Math.floor(Math.random() * 11)]}`,
		],
	}));
	await Listing.insertMany(initData.data);
	console.log("data was initialized");
};

initDB();