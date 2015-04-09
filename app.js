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

	var url = "http://www.omdbapi.com?s="+movieSearch;

	request(url, function(err, resp, body){
		if (!err && resp.statusCode === 200) {
			var jsonData = JSON.parse(body);
			console.log("\n\n\n\nTHIS IS JSON DATA", jsonData);
			res.render("search", {movies: jsonData.Search});
		}
	});
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