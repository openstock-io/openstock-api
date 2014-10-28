var request = require('request');
var cheerio = require('cheerio');

function AllaBolag(){
	this.baseUrl = 'http://www.allabolag.se';
}

AllaBolag.prototype.equalityByNumber = function(num, callback){
	this.findBoardByNumber(num, function(err, data){

		if(err){
			console.error(err);
			return err;
		}

		var total = data.length;
		var f=0, m=0, u=0;

		// Iterate and calculate genders
		data.forEach(function(el, index, array){
			if(el.sex){
				if(el.sex == 'm'){
					m++;
				}

				else if(el.sex == 'f'){
					f++;
				}

				else if(el.sex == 'u'){
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

		return callback(err = false, node);
	});
}


AllaBolag.prototype.findBoardByNumber = function(num, callback){
	url = this.baseUrl + '/' + num + '/befattningar'
	
	request(url, function(err, response, html){

		if(err){
			console.error(err);
			return err;
		}

		else{
			var $ = cheerio.load(html);

			var test = $('#printContent').find('table tr').map(function(){
				var node = $(this).find('td');

				if(node.hasClass('text12grey6')){
					var ret = {};
					
					var src = node.find('a img').attr('src');

					if(src.search(/.*kvin.*/i) > -1){
						ret.sex = 'f';
					}

					else if(src.search(/.*man.*/i) > -1){
						ret.sex = 'm';
					}

					else{
						ret.sex = 'u';
					}

					ret.name = node.find('a.linkOne').text();

					return ret;
				}

				return null;
			});

			return callback(error = false, test.get());
		}

	});
}

module.exports.AllaBolag = AllaBolag;
module.exports.AllaBolag.findBoardByNumber = AllaBolag.prototype.findBoardByNumber;
module.exports.AllaBolag.equalityByNumber = AllaBolag.prototype.equalityByNumber;
