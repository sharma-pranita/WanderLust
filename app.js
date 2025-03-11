const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require("method-override") 

let port = 8080;
const Listing = require("./models/listing.js");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.listen(port, (req, res) => {
  console.log("App is listening on port", port);
});

app.get("/", (req, res) => {
  res.send("Working!");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}))

app.use(methodOverride("_method"))
// app.get("/testListing",async(req,res)=>{
//   let sampleListing = new Listing({
//     title:"xyz",
//     description:"feijfjefbkfj",
//     price:1200,
//     location:"Bihar",
//     country:"India"
//   });

//   await sampleListing.save();
//   console.log("Sample was saved")
//   res.send("Sample was saved");

// })


//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs",{allListings});
});

//New Route

app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs")
})

//Show Route

app.get("/listings/:id",async (req,res)=>{
let {id}= req.params;
const showListing = await Listing.findById(id);
res.render("listings/show.ejs",{showListing});
})

//Create Route

app.post("/listings",async (req,res)=>{
let listing = req.body.listing;
const newListing = new Listing(listing);
await newListing.save();
res.redirect("/listings");
})


//Edit Route

app.get("/Listings/:id/edit",async(req,res)=>{
  let {id}= req.params;
  const showListing = await Listing.findById(id);
  res.render("listings/edit.ejs",{showListing})
})

//Update Route

app.put("/listings/:id",async(req,res)=>{
  let {id}= req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
})