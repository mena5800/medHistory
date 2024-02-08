const express = require("express");
const dbConnection = require("./config/database");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");


const userRoute = require("./routes/userRoutes");
const recordRoute = require("./routes/recordRoutes");
const appointmentRoute = require("./routes/appointmentRoutes")


const {authMiddleware} = require("./middlewares/authMiddleware")

// import our error handler class
const ApiError = require("./utils/apiError")

// import our error middleware
const globalErrorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config({path: "config.env"})

dbConnection()

const app = express();
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())
app.use(morgan('dev'))
app.use(authMiddleware);

app.use("/", userRoute)
app.use("/", recordRoute)
app.use("/", appointmentRoute)
function customMiddleware(req, res, next) {
  if (req.user) {
      console.log('User is authenticated');
      res.redirect('/tasks');
  } else {
      console.log('User is not authenticated');
      next(); // Call next() to pass control to the next middleware in the chain
  }
}

app.use("/",customMiddleware, express.static(path.join(__dirname, 'static/public')));



app.use("*", (req, res, next)=>{
  next(new ApiError(`path not found : ${req.originalUrl}`, 400));  // send to next middleware
})

// global error handling middleware
app.use(globalErrorMiddleware);


// running app
const server = app.listen(process.env.PORT, ()=>{
  console.log("app running");
})

// handle rejection outside express
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection error: ${err.name} | ${err.message}`);
    server.close(()=>{  // finish pending jobs before end programm
      console.error("shutting down....");
      process.exit(1);

    })
})