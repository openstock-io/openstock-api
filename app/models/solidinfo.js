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

Solidinfo.prototype.mock = function(callback){
	callback(
		err = false,
		[{"name":"ABB NORDEN HOLDING AB","href":"http://www.solidinfo.se/foretag/abb-norden-holding-ab","orgnum":"556011-5114"},{"name":"AKTIEBOLAGET ELECTROLUX","href":"http://www.solidinfo.se/foretag/aktiebolaget-electrolux-8BBB","orgnum":"556009-4178"},{"name":"AKTIEBOLAGET INDUSTRIVÄRDEN","href":"http://www.solidinfo.se/foretag/aktiebolaget-industrivarden-9562","orgnum":"556043-4200"},{"name":"AKTIEBOLAGET SKF","href":"http://www.solidinfo.se/foretag/aktiebolaget-skf-C5A7","orgnum":"556007-3495"},{"name":"AKTIEBOLAGET VOLVO","href":"http://www.solidinfo.se/foretag/aktiebolaget-volvo-9783","orgnum":"556012-5790"},{"name":"ALFA LAVAL AB","href":"http://www.solidinfo.se/foretag/alfa-laval-ab","orgnum":"556587-8054"},{"name":"ASSA ABLOY AB","href":"http://www.solidinfo.se/foretag/assa-abloy-ab","orgnum":"556059-3575"},{"name":"ASTRAZENECA AB","href":"http://www.solidinfo.se/foretag/astrazeneca-ab-F949","orgnum":"556011-7482"},{"name":"ATLAS COPCO AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/atlas-copco-aktiebolag-3710","orgnum":"556014-2720"},{"name":"AUTOLIV HOLDING AB","href":"http://www.solidinfo.se/foretag/autoliv-holding-ab-89F9","orgnum":"556687-7345"},{"name":"AXFOOD AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/axfood-aktiebolag-2243","orgnum":"556542-0824"},{"name":"BOLIDEN AB","href":"http://www.solidinfo.se/foretag/boliden-ab","orgnum":"556051-4142"},{"name":"CASTELLUM AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/castellum-aktiebolag-DA86","orgnum":"556475-5550"},{"name":"COMVIK INTERNATIONAL AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/comvik-international-aktiebolag-0AE5","orgnum":"556052-9926"},{"name":"ELEKTA AB (PUBL)","href":"http://www.solidinfo.se/foretag/elekta-ab-(publ)","orgnum":"556170-4015"},{"name":"FABEGE AB","href":"http://www.solidinfo.se/foretag/fabege-ab","orgnum":"556049-1523"},{"name":"GETINGE AB","href":"http://www.solidinfo.se/foretag/getinge-ab","orgnum":"556408-5032"},{"name":"H & M HENNES & MAURITZ AB","href":"http://www.solidinfo.se/foretag/h-o-m-hennes-o-mauritz-ab-D48A","orgnum":"556042-7220"},{"name":"HEXAGON AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/hexagon-aktiebolag-E58F","orgnum":"556190-4771"},{"name":"HOLMEN AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/holmen-aktiebolag-4ECA","orgnum":"556001-3301"},{"name":"HUFVUDSTADEN AB","href":"http://www.solidinfo.se/foretag/hufvudstaden-ab-BE12","orgnum":"556012-8240"},{"name":"HUSQVARNA AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/husqvarna-aktiebolag-007D","orgnum":"556000-5331"},{"name":"ICA GRUPPEN AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/ica-gruppen-ab-C87C","orgnum":"556048-2837"},{"name":"INVESTMENT AB KINNEVIK","href":"http://www.solidinfo.se/foretag/investment-ab-kinnevik","orgnum":"556047-9742"},{"name":"INVESTMENTAKTIEBOLAGET LATOUR","href":"http://www.solidinfo.se/foretag/investmentaktiebolaget-latour","orgnum":"556026-3237"},{"name":"INVESTOR AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/investor-aktiebolag-844B","orgnum":"556013-8298"},{"name":"L E LUNDBERGFÖRETAGEN AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/l-e-lundbergforetagen-aktiebolag-0BE6","orgnum":"556056-8817"},{"name":"LINDAB INTERNATIONAL AB","href":"http://www.solidinfo.se/foretag/lindab-international-ab","orgnum":"556606-5446"},{"name":"LUNDIN MINING AB","href":"http://www.solidinfo.se/foretag/lundin-mining-ab","orgnum":"556656-5783"},{"name":"LUNDIN PETROLEUM AB","href":"http://www.solidinfo.se/foretag/lundin-petroleum-ab","orgnum":"556610-8055"},{"name":"MEDA AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/meda-aktiebolag-5FBE","orgnum":"556427-2812"},{"name":"MELKER SCHÖRLING AB","href":"http://www.solidinfo.se/foretag/melker-schorling-ab","orgnum":"556560-5309"},{"name":"MODERN TIMES GROUP MTG AB","href":"http://www.solidinfo.se/foretag/modern-times-group-mtg-ab","orgnum":"556309-9158"},{"name":"NCC AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/ncc-aktiebolag-7479","orgnum":"556034-5174"},{"name":"NORDEA BANK AB","href":"http://www.solidinfo.se/foretag/nordea-bank-ab-B1BB","orgnum":"516406-0120"},{"name":"ORIFLAME COSMETICS AB","href":"http://www.solidinfo.se/foretag/oriflame-cosmetics-ab-EF14","orgnum":"556026-3070"},{"name":"RATOS AB","href":"http://www.solidinfo.se/foretag/ratos-ab","orgnum":"556008-3585"},{"name":"SAAB AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/saab-aktiebolag-92DD","orgnum":"556036-0793"},{"name":"SANDVIK AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/sandvik-aktiebolag-A2C8","orgnum":"556000-3468"},{"name":"SCANIA AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/scania-aktiebolag-C101","orgnum":"556184-8564"},{"name":"SECO TOOLS AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/seco-tools-aktiebolag-A2A7","orgnum":"556071-1060"},{"name":"SECURITAS AB","href":"http://www.solidinfo.se/foretag/securitas-ab","orgnum":"556302-7241"},{"name":"SKANDINAVISKA ENSKILDA BANKEN AB","href":"http://www.solidinfo.se/foretag/skandinaviska-enskilda-banken-ab-32D4","orgnum":"502032-9081"},{"name":"SKANSKA AB","href":"http://www.solidinfo.se/foretag/skanska-ab-5604","orgnum":"556000-4615"},{"name":"SSAB AB","href":"http://www.solidinfo.se/foretag/ssab-ab","orgnum":"556016-3429"},{"name":"STORA ENSO AB","href":"http://www.solidinfo.se/foretag/stora-enso-ab-BAE1","orgnum":"556173-3360"},{"name":"SWEDBANK AB","href":"http://www.solidinfo.se/foretag/swedbank-ab-82C8","orgnum":"502017-7753"},{"name":"SWEDISH MATCH AB","href":"http://www.solidinfo.se/foretag/swedish-match-ab","orgnum":"556015-0756"},{"name":"SVENSKA CELLULOSA AKTIEBOLAGET SCA","href":"http://www.solidinfo.se/foretag/svenska-cellulosa-aktiebolaget-sca-95BF","orgnum":"556012-6293"},{"name":"SVENSKA HANDELSBANKEN AB","href":"http://www.solidinfo.se/foretag/svenska-handelsbanken-ab-C8CB","orgnum":"502007-7862"},{"name":"TELE2 AB","href":"http://www.solidinfo.se/foretag/tele2-ab","orgnum":"556410-8917"},{"name":"TELEFONAKTIEBOLAGET L M ERICSSON","href":"http://www.solidinfo.se/foretag/telefonaktiebolaget-l-m-ericsson-692D","orgnum":"556016-0680"},{"name":"TELIASONERA AKTIEBOLAG","href":"http://www.solidinfo.se/foretag/teliasonera-aktiebolag-F233","orgnum":"556103-4249"},{"name":"TIETO SWEDEN AB","href":"http://www.solidinfo.se/foretag/tieto-sweden-ab-BF23","orgnum":"556052-7466"},{"name":"TRELLEBORG AB","href":"http://www.solidinfo.se/foretag/trelleborg-aktiebolag-A730","orgnum":"556006-3421"}]
	);
};


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



// Exports
module.exports.Solidinfo = Solidinfo;
module.exports.Solidinfo.largecap = Solidinfo.prototype.largecap;

