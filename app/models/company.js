var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var companySchema = new Schema({
	name: {type: String, required: true},
	shortName: {type: String, required: true},
	orgNum: {type: String, required: false},
	index: [{name: String, value: Number}]
});

module.exports = mongoose.model('company', companySchema);
