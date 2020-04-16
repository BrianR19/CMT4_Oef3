// npm init
const port = 5000;

// mogelijkheden module express aan de variabelen express koppelen
let express = require('express');
let path = require('path');

// webapplicatie aanmaken van het type express
let app = express();

// aan de applicatie vertellen dat we werken met views
app.set("views", path.resolve(__dirname, 'views'));


// werken met EJS
app.set("view engine", "ejs");

// vertel aan webserver waar de publieke bestanden zitten
app.use(express.static('public'));

// databestand inladen
const werk = require('./data/musketon.json');

// route naar "homepagina" laten werken
app.get('/', function(req,res){
  res.render('home', {
    works: werk.werken
  });
});

// detailpagina van een blogbericht

// inhoud op het scherm plaatsen
// <form action="" type="POST = geven /GET = krijgen"
// app.get("/", function(request, response){
//   // response.send("Hallo wereld!")
//   response.render("home");
// });

app.get("/contact", function(request, response){
  response.render("contact");
});

app.get("/werk", function(request, response){
  response.render("werk", {
    // Array van blogberichten doorgeven aan de renderfunctie om op de homepagina te tonen.
    works: werk.werken
  });
});

app.get('/werk/:werkid', function(req,res){
  res.render('detail', {
    work: werk.werken[req.params.werkid]
  });
});



// app.get("/profile/:name", function(request, response){
//   response.send("Hallo "+ request.params.name +"!")
// });

// 404 - Catch all
app.use(function(request, response){
  response.statusCode = 404;
  response.end("ERROR 404! Niets gevonden")
});

// webserver laten draaien
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
  // function(){console.log('luister op poort: ' + port);
});
