var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

var port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/take_a_hike", {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
var parkSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Park = mongoose.model("Park", parkSchema);
// Park.create(
//   {
//     name: "Rocky Mountain",
//     image:
//       "https://images.pexels.com/photos/1867601/pexels-photo-1867601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
//     description:
//       "Beautiful park set by the base of the Rocky Mountains in Colorado!"
//   },
//   function(err, park) {
//     if (err) {
//       console.log("there was an error");
//     } else {
//       console.log("Newly Created Park:");
//       console.log(park);
//     }
//   }
// );

app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX - Displays a list of all parks
app.get("/parks", function(req, res) {
  // Get all parks from DB
  Park.find({}, function(err, allParks) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { parks: allParks });
    }
  });
});

// CREATE - add new park to DB
app.post("/parks", function(req, res) {
  // GET data from form and add to parks array
  var name = req.body.name,
    image = req.body.image,
    description = req.body.description,
    newPark = { name: name, image: image, description: description };

  // Creat a new park and save to DB
  Park.create(newPark, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to parks page
      res.redirect("/parks");
    }
  });
});

// NEW - Displays form to make new park
app.get("/parks/new", function(req, res) {
  res.render("new.ejs");
});

// SHOW - shows info about one park
app.get("/parks/:id", function(req, res) {
  // find the park with provided id
  Park.findById(req.params.id, function(err, foundPark) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", { park: foundPark });
    }
  });
});

app.listen(port, function() {
  console.log("The HikeUp Server Has Started!");
});

// {
//   name: "Yellowstone",
//   image: "https://images.pexels.com/photos/640907/pexels-photo-640907.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
// },
// {
//   name: "Rocky Mountain",
//   image: "https://images.pexels.com/photos/1867601/pexels-photo-1867601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
// },
// {
//   name: "Yosemite",
//   image: "https://images.pexels.com/photos/533881/pexels-photo-533881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
// },
// {
//   name: "Redwood Forest",
//   image: "https://images.pexels.com/photos/1841777/pexels-photo-1841777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
// }
