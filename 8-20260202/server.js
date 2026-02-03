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

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

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
