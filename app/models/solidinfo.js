var request = require('request');
var cheerio = require('cheerio');

request.debug = true;

function Solidinfo(){
}

Solidinfo.prototype.largecap = function(callback){	
	var options = {
	    url: 'http://www.solidinfo.se/borsnoterade-bolag/large-cap',
	    headers: {
	        'followRedirect': false,
	        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25'
	    }
	};

	request(options, function(err, response, html){
		if(err){
			console.error(err);
			return err;
		}

		else{
			var $ = cheerio.load(html);

			var node = $("#ctl00_pnlMasterPageFooter").children('div').eq(1).children('table').eq(1).children().eq(0).children('td').eq(0).children('table').eq(0).children().map(function(index, element){
				return $(element).children('td').eq(0).children('a').eq(0).text();
			});

			console.log(node.toArray());

			return callback(error = false, {});
		}

	});
}

module.exports.Solidinfo = Solidinfo;
module.exports.Solidinfo.largecap = Solidinfo.prototype.largecap;