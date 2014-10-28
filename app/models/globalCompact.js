var request = require('request');
var cheerio = require('cheerio');

function GlobalCompact(){
	this.baseUrl = 'https://www.unglobalcompact.org';
	this.url = this.baseUrl + '/participants/search?business_type=2&commit=Search&cop_status=active&country%5B%5D=190&joined_after=&joined_before=&keyword=&listing_status_id=3&organization_type_id=&page=1&per_page=250&sector_id=&utf8=1';
}


GlobalCompact.prototype.crawl = function(callback){
	request(this.url, function(error, response, html){

		if(!error){
			var $ = cheerio.load(html);

			var test = $('#rightcontent').find('table').find('tbody tr').map(function(){
				var node = {};
				node.name = $(this).find('td div a').text();
				node.href = this.baseUrl + $(this).find('td div a').attr('href');

				return node;
			});

			return callback(error = false, test.get());
		}

	});
}

module.exports.GlobalCompact = GlobalCompact;
module.exports.GlobalCompact.crawl = GlobalCompact.prototype.crawl;