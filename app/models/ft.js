var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var fs  = require('fs');

request.debug = true;

function Ft(){
}


Ft.prototype.merge = function(list1, list2, callback){
	list1.forEach(function(el1){
		list2.forEach(function(el2){
			if(el1.name == el2.name){
				el1.globalcompact = true
			}
		});
	});

	callback(list1);
}


Ft.prototype.parse = function(html, callback){
	var $ = cheerio.load(html);

	var node = $('#rows').children('div.row').map(function(index, element){
		var ret = {};

		ret.name = $(element).find('div.company-name').find('a').text();
		ret.ticker = $(element).find('div.company-name').find('a').attr('data-hover-chart');
		ret.country = $(element).find('div.company-country').find('a').text();

		return ret;
	});

	callback(error = false, node.get());
}


Ft.prototype.ft500 = function(callback){
	var _this = this;
	error = false,
	fs.readFile('app/ft500.html', 'utf8', function(err, data){
		if(err){
			console.error(err);
		}

		else{
			_this.parse(data, callback);
		}
	});
}




// Exports
module.exports.Ft = Ft;
module.exports.Ft.ft500 = Ft.prototype.ft500;
