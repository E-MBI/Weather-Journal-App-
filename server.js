// Setup empty JS object to act as endpoint for all routes
projectData = {};
//port number is :
const port = 7070;
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log("Y're Server Is Runing Now  At Port => " + "  " + `${port}`);
});
//get route server side ,return endpoint data
app.get("/getTempData", (req, res) => {
  //when user sen req the rep sen the object of js projectData
  res.send(projectData);
});

//post req that save data on server
app.post("/setTempData", (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.feelings = req.body.feelings;
  res.end();
});
