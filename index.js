const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
require("dotenv").config();
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const errorhandler = require("./middleware/errorhandler");
const ConnectDB = require("./config/ConnectDB");
const userRoute = require("./routes/userRoutes");
const propertyRoute = require("./routes/propertyRoutes");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:8000", "http://localhost:5173"],
    credentials: true,
  }),
);

app.use("/api/users", userRoute);
app.use("/api/properties", propertyRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorhandler);

const StartServer = async () => {
  try {
    await ConnectDB();
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();
