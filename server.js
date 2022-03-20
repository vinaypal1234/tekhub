const express = require("express");
const app = express();

const mongoose = require("./Database");

const landingPageRouter = require("./Routes/landingRoute");

const adminRouter = require("./Routes/adminRoute");

const PORT = process.env.PORT || 4000;

// IMPORT AND USE SESSION
const session = require("express-session");

app.use(
  session({
    secret: "D3E74%X2N#ye*VL9",
    resave: false,
    saveUninitialized: true,
  })
);

// To Get Body
app.use(express.urlencoded());

// To Process JSON File
app.use(express.json());

// View Engine
app.set("view engine", "ejs");

// Static File
app.use(express.static("public"));

// landing Page Session Managemnet Middleware FOR LANDING PAGE ROUTER

// landing Page Session Managemnet Middleware FOR ADMIN ROUTER
app.use(function (req, res, next) {
  res.locals.username = req.session.username;
  res.locals.email = req.session.email;
  res.locals.cartData = null;
  next();
});
app.use(landingPageRouter);
app.use(adminRouter);

//SERVER LISTENING
app.listen(PORT, () => {
  console.log("server started");
});
