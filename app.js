var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app     = express();

app.use(bodyParser.json())

try {
  var config = require('./config');
} catch (e) {}

// Get URL from Environment or Local config
var mongoURL = process.env.MONGOHQ_URL || config.MONGOHQ_URL;

mongoose.connect(mongoURL);

var port = process.env.PORT || 8001; 		// set our port

var router = express.Router(); 				// get an instance of the express Router

var Company     = require('./app/models/company');

// app.use('/api', router);

var Globalcompact     = require('./app/models/Globalcompact');
var Allabolag   	  = require('./app/models/Allabolag');

// Get all companies
app.get('/company', function(req, res){

	Company.find(function(err, collection){
		if(err){
			return console.error(err);
		}

		res.send(collection);

	});

});


// Get One company
app.get('/company', function(req, res){

});


// Create one company
app.post('/company', function(req, res){
	var post = req.body;

	if(!post.name){
		return res.status(400).send('Bad request');
	}

	var acme = new Company({name: post.name});

	acme.save(function(err, acme){
		if(err){
			console.error(err);
			return res.status(400).send('Bad request');
		}

		res.send(acme);
	});

});


// Perform a web crawl and output as json
app.get('/gc', function(req, res){
	var gc = new Globalcompact.Globalcompact();

	gc.crawl(function(err, data){
		if(!err)
			res.json(data);
		else
			res.status(400).send('Bad request');
	});
});



// Perform a web crawl and output as json
app.get('/ab/:id', function(req, res){
	var ab = new Allabolag.Allabolag();

	ab.findBoardByNumber(req.params.id, function(err, data){
		if(!err)
			res.json(data);
		else
			res.status(400).send('Bad request');
	});
});


// Perform a web crawl and output as json
app.get('/equality/:id', function(req, res){
	var ab = new Allabolag.Allabolag();

	ab.equalityByNumber(req.params.id, function(err, data){
		if(!err){
			res.json(data);
		}
		else
			res.status(400).send('Bad request');
	});
});


// Update a company
app.put('/company', function(req, res){

});


app.listen(port);

console.log(port);

exports = module.exports = app;