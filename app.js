var express = require('express');
var app = express();
var request = require('request');
var db = require('./models');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function(req,res){
	res.render("index", {title: "My title"});
});


app.get('/login', function(req,res){
	res.render("user/login");
});

app.get('/signup', function(req,res){
	res.render("user/signup");
});

app.get('/profile', function(req,res){
	res.send("I'm a profile");
});

app.post('/login', function(req,res){
	res.send("I'm a login");
});

// GET /user/:id ---> req.params.id
// GET /user -------> req.query.id
// POST /user ------> req.body.id

app.post('/signup', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.createSecure(email,password)
	  .then(function(user){
	  	res.redirect('/profile');
	  });
});

app.delete('/logout', function(req,res){
	res.send("I'm a delete");
});


app.get('/search',function(req,res){
	var movieSearch = req.query.q3;
	if (!movieSearch) {
		res.render("search", {movies: [], noMovies: true});
	} else {
		var url = "http://www.omdbapi.com?s="+movieSearch;

		request(url, function(err, resp, body){
			console.log("I'm in here 2");
			if (!err && resp.statusCode === 200) {
				console.log("I'm in here 3");
				var jsonData = JSON.parse(body);
				if (!jsonData.Search) {
					res.render("search", {movies: [], noMovies: true});
				}
				res.render("search", {movies: jsonData.Search, noMovies: false});
			}
		});
	}
});

app.get('/movie', function(req,res){
	var imdbID = req.query.id;

	var url = 'http://www.omdbapi.com?i='+imdbID;
	request(url, function(err, resp, body){
		if (!err && resp.statusCode === 200) {
			var movieData = JSON.parse(body);
			res.render("movie", {movie: movieData});	
		}
	});
});


app.listen(3000, function(){
	console.log("I'm listening");
});