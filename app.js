var express = require('express');
var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require('body-parser') // To get the body from a POST
var app     = express();

app.use(bodyParser.json())

// Locally - get configuration from file
try {
  var config = require('./config');
} catch (e) {}

// Get URL from Environment or Local config
var mongoURL = process.env.MONGOHQ_URL || config.MONGOHQ_URL;

mongoose.connect(mongoURL);

var port = process.env.PORT || 8001;

// Get an instance of the express Router
var router = express.Router();// 




/********************************
*								*
*	Mongoose Database Models 	*
*								*
*********************************/

var Schema       = mongoose.Schema;

var indexSchema = new Schema({
	name: {type: String, required: true},
	value: {type: Number}
});

var stockSchema = new Schema({
	tickername: {type: String, required: false},
	lastprice: {type: Number}
});

var linksSchema = new Schema({
	name: {type: String, required: true},
	url: {type: String, required: false}
});

var companySchema = new Schema({
	name: {type: String, required: true},
	shortname: {type: String, required: false},
	orgnum: {type: String, required: false},
	// index: [indexSchema],
	// stocks: [stockSchema],
	// links: [linksSchema]
});

var Company = mongoose.model('Company', companySchema);




/************
*			*
*	Models 	*
*			*
*************/

var Globalcompact   = require('./app/models/globalcompact');
var Allabolag   	= require('./app/models/allabolag');
var Avanza   	  	= require('./app/models/avanza');
var Solidinfo  	  	= require('./app/models/solidinfo');



/****************************
*							*
*	API - Express Routes	*
*							*
*****************************/


// Get all companies
app.get('/company', function(req, res){
	Company.find(function(err, collection){
		if(err){
			return console.error(err);
		}

		res.send(collection);
	});
});


// Get one company
app.get('/company/:id', function(req, res){
	Company.findOne({}, function(err, company){
		if(err){
			return console.error(err);
		}

		res.send(company);
	});
});


// Create one company
app.post('/company', function(req, res){
	console.log(req.body)
	var post = req.body;


	if(!post.name){
		console.error(req.body)
		return res.status(400).send('Bad request');
	}

	var acme = new Company(req.body);

	acme.save(function(err, acme){
		if(err){
			console.error(err);
			return res.status(400).send('Bad request');
		}

		res.send(acme);
	});

});


// Perform a web crawl and output as json
app.get('/globalcompact', function(req, res){
	var gc = new Globalcompact.Globalcompact();

	gc.crawl(function(err, data){
		if(!err)
			res.json(data);
		else
			res.status(400).send('Bad request');
	});
});



// Perform a web crawl and output as json
app.get('/board/:id', function(req, res){
	var ab = new Allabolag.Allabolag();

	ab.findBoardByNumber(req.params.id, function(err, data){
		if(!err){
			console.log(data);
			res.json(data);
		}
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


// Perform a web crawl and output as json
app.get('/av/largecap', function(req, res){
	var av = new Avanza.Avanza();

	av.largecap(req.params.id, function(err, data){
		if(!err){
			res.json(data);
		}
		else
			res.status(400).send('Bad request');
	});
});


// Perform a web crawl and output as json
app.get('/solidinfo/largecap', function(req, res){
	var si = new Solidinfo.Solidinfo();

	si.largecap(function(err, data){
		if(!err){

			async.forEach(data, function(el, next){
				console.log(el);
				Company.update({'orgnum':el.orgnum}, { $set: el}, {upsert:true}, function(){
					next();
				});
			}, function(){
				res.json(data);
			});

		}
		else
			res.status(400).send('Bad request');
	});
});



// Update all companies
app.get('/crawl/update-all-companies', function(req, res){

});


// Update a company
app.put('/company/:id', function(req, res){

});






// Start application
app.listen(port);
console.log(port);
exports = module.exports = app;