var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

request.debug = true;

function Solidinfo(){
	this.baseUrl = 'http://www.solidinfo.se';
	this.headers = {
        'followRedirect': false,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25'
    }
}


Solidinfo.prototype.getInfo = function(object, callback) {
	var _this = this;

	var options = {
	    url: '',
	    headers: this.headers
	};

	// Loop through object
	async.each(object, function(el, next){

		options.url = el.href + '/grunddata';

		// Make a request for each link
		request(options, function(err, response, html){
			if(err){
				return err;
			}

			else{
				var $ = cheerio.load(html);
				var node = $('#ctl00_pnlMasterPageFooter').children('div').eq(1).find('header div.ftgorgnr').eq(0).find('span');
				el.orgum = node.text();
			}
			next();

		});

	}, function(err){
		callback(object);
	});

};


Solidinfo.prototype.largecap = function(callback){	
	var _this = this;

	var options = {
	    url: this.baseUrl + '/borsnoterade-bolag/large-cap',
	    headers: this.headers
	};

	request(options, function(err, response, html){
		if(err){
			console.error(err);
			return err;
		}

		else{
			var $ = cheerio.load(html);

			var node = $("#ctl00_pnlMasterPageFooter").children('div').eq(1).children('table').eq(1).children().eq(0).children('td').eq(0).children('table').eq(0).children().map(function(index, element){
				var node = $(element).children('td').eq(0).children('a').eq(0);
				var ret = {};

				ret.name = node.text();
				ret.href = _this.baseUrl + node.attr('href');

				return ret;
			});

			_this.getInfo(node.get(), function(finalNode){
				return callback(error = false, finalNode);
			});
		}

	});
}

module.exports.Solidinfo = Solidinfo;
module.exports.Solidinfo.largecap = Solidinfo.prototype.largecap;