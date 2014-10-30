var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var companySchema = new Schema({
	name: {type: String, required: true},
	shortname: {type: String, required: false},
	orgnum: {type: String, required: false},
	index: [{name: String, value: Number}],
	stocks: [{type: Schema.Types.ObjectId, ref: 'Stock'}]
});

var stockSchema = new Schema({
	tickername: {type: String, required: false},
	lastprice: {type: Number}
});

var Company = mongoose.model('Company', companySchema);
var Stock = mongoose.model('Stock', stockSchema);

module.exports = Company;
