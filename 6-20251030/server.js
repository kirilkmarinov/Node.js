const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3500;

// Define a route for GET requests to the root URL
app.get("/", (req, res) => {
  //   res.send("Hello");

  //   res.sendFile(path [, options] [, fn])
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// app.get("/new-page.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "new-page.html"));
// });

// (\.html)? means optional
app.get(/^\/new-page(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get(/^\/old-page(\.html)?$/, (req, res) => {
  res.redirect(301, "new-page.html");
});

// route handlers
app.get(
  /^\/hello(\.html)?$/,
  (req, res, next) => {
    console.log("load hello.html");
    next(); // goes to the next handler
  },
  (req, res) => {
    res.send("this is the next handler");
  }
);

// chaining route handlers
const one = (req, res, next) => {
  console.log("this is one");
  next();
};

const two = (req, res, next) => {
  console.log("this is two");
  next();
};

const three = (req, res) => {
  console.log("this is three");
  res.send("this is three");
};

app.get(/^\/chaining(\.html)?$/, [one, two, three]);

app.get(/.*/, (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
