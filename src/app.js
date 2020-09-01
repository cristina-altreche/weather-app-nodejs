const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// To use partials
const hbs = require("hbs");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //allows us to customize views folder name and route
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs"); //all we need to set up handlebars
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); //partials path setup

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

//allows us to render index.hbs
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tina",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tina",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Do you need help with something?",
    title: "Help",
    name: "Tina",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: " You must provide an address term.",
    });
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
  });
});

// * means everything that hasn't been used yet will throw an error.
// Needs to come last because express looks through from top to bottom for a match.
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404 Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
