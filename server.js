const express = require("express")
const hbs = require("hbs")
const fs = require("fs")
var app = express()
const port = process.env.PORT || 3000;

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")

app.use((req, res, next)=>{
  var now = new Date().toString()
  var log = `${now} : ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile("server.log", log + "\n", (err)=>{
    if(err){
      console.log("unable to connect to the server!!")
    }
  })
  next()
})

// app.use((req, res, next)=>{
//   res.render("mainset.hbs")
// })
app.use(express.static(__dirname + "/public"))

hbs.registerHelper("getCurrentYear", ()=>{
  return new Date().getFullYear()
})
hbs.registerHelper("screamIt", (text)=>{
  return text.toUpperCase()
})

app.get("/", (req, res)=>{
  res.render("home.hbs", {
    pageTitle : "Welcome to the best website ever, Have fun!",
    welcomePage : "this is the welcoming page to this awesome page"
  })
  // res.send("<h1>Hello express</h1>")
  // res.send({
  //   name : "Mand",
  //   likes :[
  //     "football",
  //     "programming"
  //   ]
  // })
})

app.get("/about", (req, res)=>{
  res.render("about.hbs", {
    pageTitle : "About page"
  })
})

app.get("/projects", (req, res)=>{
  res.render("projects.hbs", {
    pageTitle: "projects page ",
    message : "here are your Project of you have none then what are you waiting for ? make one"
  })
})

app.get("/bad", (req, res)=>{
  res.send({
    errorMessage : "Unable to fulfill the data"
  })
})

app.listen(port, function(){
  console.log(  `connected ${port}`)
})
