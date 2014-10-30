var request = require('request');
var cheerio = require('cheerio');

function Globalcompact(){
}


Globalcompact.prototype.crawl = function(callback){
	baseUrl = 'https://www.unGlobalcompact.org';
	url = baseUrl + '/participants/search?business_type=2&commit=Search&cop_status=active&country%5B%5D=190&joined_after=&joined_before=&keyword=&listing_status_id=3&organization_type_id=&page=1&per_page=250&sector_id=&utf8=1';

	request(url, function(error, response, html){

		if(!error){
			var $ = cheerio.load(html);

			var test = $('#rightcontent').find('table').find('tbody tr').map(function(){
				var node = {};
				node.name = $(this).find('td div a').text();
				node.href = baseUrl + $(this).find('td div a').attr('href');

				return node;
			});

			return callback(error = false, test.get());
		}

	});
}

module.exports.Globalcompact = Globalcompact;
module.exports.Globalcompact.crawl = Globalcompact.prototype.crawl;