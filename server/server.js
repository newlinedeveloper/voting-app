const express = require("express");
// const request = require("request");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
var cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

var app = express();

// BodyParser to parse post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

// Set Static Directory
app.use(express.static(__dirname + "/src"));

// Connect to Database
const MONGO_URI =
  "mongodb+srv://test:qGrjG5mQE8X32yF4@demo-xzslx.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Requests
app.use("/api/users", require("./api/routes/userRoute"));
app.use("/api/candidates", require("./api/routes/candidateRoute"));



app.get("*", (req, res) => {
  res.sendFile(path.resolve("src/index.html"));
});

// Listen for HTTP Requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
