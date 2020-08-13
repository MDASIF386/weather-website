//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {

  const city = req.body.cityName;
  const apikey = "b81a19f2e74e26991a3a1be2c51efad8";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + unit;

  
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const we = JSON.parse(data);
      const temp = we.main.temp;
      const desc = we.weather[0].description;
      const icon = we.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.write("<h1>The temperature in " + city + " is " + temp + "degree celsuis</h1>");
      res.write("<p>The weather is currently" + " " + desc + "</p>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });

  });
});

//   (req.body.cityName);


//


app.listen(3000, function () {
  console.log("server is running on port 3000");
});
