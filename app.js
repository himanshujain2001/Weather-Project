//jshint esversion:6

const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
const ejs = require('ejs');
require('dotenv').config();
const port=3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
res.render("list");
});

app.post("/",function(req,res){
  const sheher=req.body.CityName;
  const api=process.env.API;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+sheher+"&units=metric&appid="+api;

  https.get(url,function(response){
    response.on("data",function(data){
      if(response.statusCode===200){
        const weatherData=JSON.parse(data);
        const garmi=weatherData.main.temp;
        const mausam=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const weatherImage="http://openweathermap.org/img/wn/"+icon+"@2x.png";
         res.render("success",{query:sheher,temps:garmi,weatherDescription:mausam,imageURL:weatherImage});
      }else{
        res.render("failure");
      }
        });
        });
});

app.post("/success",function(req,res){
  res.redirect("/");
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(port,function(){
  console.log("Server is running on port 3000");
});
