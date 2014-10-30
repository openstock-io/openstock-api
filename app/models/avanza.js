var request = require('request');
var cheerio = require('cheerio');

function Avanza(){
	this.baseUrl = 'http://www.avanza.se';
}



Avanza.prototype.largecap = function(num, callback){
	url = this.baseUrl + '/aktier/lista.html?countryCode=SE&marketPlaceOrList=LIST_LargeCap.SE&sectorId=ALL&sortField=NAME&sortOrder=ASCENDING&activeTab=quote';
	
	request(url, function(err, response, html){

		if(err){
			console.error(err);
			return err;
		}

		else{
			var $ = cheerio.load(html);

			var test = $('#contentTable').find('tbody tr').map(function(){				
				var ret = {};

				ret.name = $(this).find('td.instrumentName span a').text().trim();
				ret.lastprice = $(this).find('td.lastPrice span').text().trim();

				return ret;
			});

			return callback(error = false, test.get());
		}

	});
}

module.exports.Avanza = Avanza;
module.exports.Avanza.largecap = Avanza.prototype.largecap;