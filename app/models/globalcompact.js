var request = require('request');
var cheerio = require('cheerio');

function Globalcompact(){
}

Globalcompact.prototype.getOne = function(id, callback){
	baseUrl = 'https://www.unglobalcompact.org';
	url = baseUrl + '/participants/search?utf8=true&commit=Search&keyword=' + id + '&business_type=2&listing_status_id=3&cop_status=active&organization_type_id=&commit=Search';

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

Globalcompact.prototype.mock = function(callback){
	callback(
		err = false,
		[{"name":"NIBE Industrier AB","href":"https://www.unglobalcompact.org/participant/43521-NIBE-Industrier-AB"},{"name":"AF AB","href":"https://www.unglobalcompact.org/participant/41721-AF-AB"},{"name":"Investor AB","href":"https://www.unglobalcompact.org/participant/32991-Investor-AB"},{"name":"Lammhults Design Group AB","href":"https://www.unglobalcompact.org/participant/31981-Lammhults-Design-Group-AB"},{"name":"Ratos AB","href":"https://www.unglobalcompact.org/participant/24521-Ratos-AB"},{"name":"Sandvik AB","href":"https://www.unglobalcompact.org/participant/19685-Sandvik-AB"},{"name":"Mekonomen AB","href":"https://www.unglobalcompact.org/participant/19129-Mekonomen-AB"},{"name":"TeliaSonera AB","href":"https://www.unglobalcompact.org/participant/18662-TeliaSonera-AB"},{"name":"Swedol AB","href":"https://www.unglobalcompact.org/participant/18234-Swedol-AB"},{"name":"Boliden Group","href":"https://www.unglobalcompact.org/participant/17765-Boliden-Group"},{"name":"DGC One AB","href":"https://www.unglobalcompact.org/participant/16040-DGC-One-AB"},{"name":"Alfa Laval Group","href":"https://www.unglobalcompact.org/participant/15386-Alfa-Laval-Group"},{"name":"Note AB","href":"https://www.unglobalcompact.org/participant/15196-Note-AB"},{"name":"eWork Scandinavia AB","href":"https://www.unglobalcompact.org/participant/15038-eWork-Scandinavia-AB"},{"name":"Aros Quality Group AB","href":"https://www.unglobalcompact.org/participant/15029-Aros-Quality-Group-AB"},{"name":"Saab AB (publ)","href":"https://www.unglobalcompact.org/participant/13555-Saab-AB-publ-"},{"name":"Transmode Systems AB","href":"https://www.unglobalcompact.org/participant/13979-Transmode-Systems-AB"},{"name":"Investment AB Kinnevik","href":"https://www.unglobalcompact.org/participant/13920-Investment-AB-Kinnevik"},{"name":"Midsona AB","href":"https://www.unglobalcompact.org/participant/13610-Midsona-AB"},{"name":"Lundin Petroleum AB","href":"https://www.unglobalcompact.org/participant/11629-Lundin-Petroleum-AB"},{"name":"HL Display AB (publ)","href":"https://www.unglobalcompact.org/participant/11083-HL-Display-AB-publ-"},{"name":"NCC Group","href":"https://www.unglobalcompact.org/participant/11006-NCC-Group"},{"name":"Nolato AB","href":"https://www.unglobalcompact.org/participant/10431-Nolato-AB"},{"name":"SSAB AB (publ.)","href":"https://www.unglobalcompact.org/participant/10465-SSAB-AB-publ-"},{"name":"Svenska Handelsbanken ...","href":"https://www.unglobalcompact.org/participant/8929-Svenska-Handelsbanken-AB-publ-"},{"name":"Lindab International AB","href":"https://www.unglobalcompact.org/participant/6135-Lindab-International-AB"},{"name":"Atrium Ljungberg AB","href":"https://www.unglobalcompact.org/participant/981-Atrium-Ljungberg-AB"},{"name":"Cloetta AB","href":"https://www.unglobalcompact.org/participant/2213-Cloetta-AB"},{"name":"Clas Ohlson AB","href":"https://www.unglobalcompact.org/participant/2188-Clas-Ohlson-AB"},{"name":"Atlas Copco AB","href":"https://www.unglobalcompact.org/participant/977-Atlas-Copco-AB"},{"name":"The Rezidor Hotel Group","href":"https://www.unglobalcompact.org/participant/9303-The-Rezidor-Hotel-Group"},{"name":"SCA Svenska Cellulosa ...","href":"https://www.unglobalcompact.org/participant/8928-SCA-Svenska-Cellulosa-Aktiebolaget-"},{"name":"Holmen AB","href":"https://www.unglobalcompact.org/participant/4904-Holmen-AB"},{"name":"Trelleborg AB","href":"https://www.unglobalcompact.org/participant/9510-Trelleborg-AB"},{"name":"Axis Communications AB","href":"https://www.unglobalcompact.org/participant/1056-Axis-Communications-AB"},{"name":"Aktiebolaget SKF","href":"https://www.unglobalcompact.org/participant/407-Aktiebolaget-SKF"},{"name":"Nordea Bank AB","href":"https://www.unglobalcompact.org/participant/6976-Nordea-Bank-AB"},{"name":"ICA Gruppen","href":"https://www.unglobalcompact.org/participant/5036-ICA-Gruppen"},{"name":"Skandinaviska Enskilda...","href":"https://www.unglobalcompact.org/participant/8550-Skandinaviska-Enskilda-Banken-AB"},{"name":"Swedbank","href":"https://www.unglobalcompact.org/participant/8939-Swedbank"},{"name":"AB Electrolux","href":"https://www.unglobalcompact.org/participant/62-AB-Electrolux"},{"name":"Axfood AB","href":"https://www.unglobalcompact.org/participant/1051-Axfood-AB"},{"name":"AB Volvo Group","href":"https://www.unglobalcompact.org/participant/69-AB-Volvo-Group"},{"name":"Skanska AB","href":"https://www.unglobalcompact.org/participant/8551-Skanska-AB"},{"name":"H & M, Hennes & Maurit...","href":"https://www.unglobalcompact.org/participant/4719-H-M-Hennes-Mauritz-AB"},{"name":"LM Ericsson","href":"https://www.unglobalcompact.org/participant/6170-LM-Ericsson"}]
	);
}


Globalcompact.prototype.crawl = function(callback){
	baseUrl = 'https://www.unglobalcompact.org';
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


Globalcompact.prototype.parseFt500 = function(html, callback){
	var $ = cheerio.load(html);

	var test = $('#rightcontent').find('table').find('tbody tr').map(function(){
		var node = {};
		node.name = $(this).find('td div a').text();

		return node;
	});

	callback(error = false, test.get());
}



Globalcompact.prototype.ft500 = function(callback){
	var _this = this;

	baseUrl = 'https://www.unglobalcompact.org';
	url = baseUrl + '/participants/search?business_type=2&commit=Search&cop_status=active&is_ft_500=1&joined_after=&joined_before=&keyword=&listing_status_id=3&organization_type_id=&page=1&per_page=250&sector_id=&utf8=true';

	request(url, function(error, response, html){
		if(error)
			console.error(error);

		else
			_this.parseFt500(html, callback);
	});
}







module.exports.Globalcompact = Globalcompact;
module.exports.Globalcompact.ft500 = Globalcompact.prototype.ft500;
module.exports.Globalcompact.crawl = Globalcompact.prototype.crawl;
module.exports.Globalcompact.getOne = Globalcompact.prototype.getOne;


