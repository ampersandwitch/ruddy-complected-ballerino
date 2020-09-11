const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/weatherProject.html");

})

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "dc8b760c05c012bfde136fffbc6c4f2f";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The weather in " + query + " is currently " + weatherDescription + ".</h1>");
      res.write("<h1>The temperature is " + temp + " degrees Farenheit.</h1>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    })
  });
})






app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
