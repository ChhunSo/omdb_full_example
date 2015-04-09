var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get('/', function(req,res){
	res.render("index", {title: "My title"});
});

app.get('/search',function(req,res){
	var movieSearch = req.query.q3;
	if (!movieSearch) {
		res.render("search", {movies: []});
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