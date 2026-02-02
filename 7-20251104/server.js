const express = require("express");
const path = require("path");
const cors = require("cors");
const { logEvents, logger } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();

const PORT = process.env.PORT || 3500;

// custom middleware logger
// app.use((req, res, next) => {
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
//   console.log(`${req.method} ${req.path}`);
//   next();
// });
app.use(logger);

// apply cors
// CORS - cross origin resource sharing
const whiteList = [
  "https://google.com",
  "https://127.0.0.1:5500",
  "http://localhost:3500/",
];

const options = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(options));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

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
  },
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

// app.use()

// app.get(/.*/, (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

app.all(/.*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send(err.message);
// });

app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
