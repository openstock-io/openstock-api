var request = require('request');
var cheerio = require('cheerio');

function Allabolag(){
	this.baseUrl = 'http://www.allabolag.se';
}

Allabolag.prototype.equalityByNumber = function(num, callback){
	this.findBoardByNumber(num, function(err, data){

		if(err){
			console.error(err);
			return callback(err = true, err);
		}

		var total = data.length;
		var f=0, m=0, u=0;

		// Iterate and calculate genders
		data.forEach(function(el, index, array){
			if(el.gender){
				if(el.gender == 'm'){
					m++;
				}

				else if(el.gender == 'f'){
					f++;
				}

				else if(el.gender == 'u'){
					u++;
				}
			}

			else{
				u++;
			}

		});

		// Equality Object
		var node = {
			men: m,
			women: f,
			unknown: u,
			'total': total,
			'ratio female to men': f + ':' + m,
			'percentage of women': (100 * (f/total)).toFixed(0),
			'percentage of men': (100 * (m/total)).toFixed(0),
			'percentage of unknown': (100 * (u/total)).toFixed(0)
		};

		callback(err = false, node);
	});
}


Allabolag.prototype.findBoardByNumber = function(num, callback){
	num = num.replace('-', '');

	url = this.baseUrl + '/' + num + '/befattningar'
	
	request({'url':url}, function(err, response, html){

		if(err)
			return callback(error = true, err);

		else{
			var $ = cheerio.load(html);

			var test = $('#printContent').find('table tr').map(function(){
				var node = $(this).find('td');

				if(node.hasClass('text12grey6')){
					var ret = {};
					
					var src = node.find('a img').attr('src');

					if(src.search(/.*kvin.*/i) > -1){
						ret.gender = 'f';
					}

					else if(src.search(/.*man.*/i) > -1){
						ret.gender = 'm';
					}

					else{
						ret.gender = 'u';
					}

					ret.name = node.find('a.linkOne').text();

					return ret;
				}

				return null;
			});

			callback(error = false, test.get());
		}

	});
}




// Exports
module.exports.Allabolag = Allabolag;
module.exports.Allabolag.findBoardByNumber = Allabolag.prototype.findBoardByNumber;
module.exports.Allabolag.equalityByNumber = Allabolag.prototype.equalityByNumber;

