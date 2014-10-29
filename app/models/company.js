var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var companySchema = new Schema({
	name: {type: String, required: true},
	shortname: {type: String, required: false},
	orgnum: {type: String, required: false},
	index: [{name: String, value: Number}]
});

module.exports = mongoose.model('company', companySchema);
