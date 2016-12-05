var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlayerSchema   = new Schema({
    name: String,
    money: Number,
    interns: Number,
    geeks: Number,
    manishes: Number,
    yanos: Number,
    bills: Number,
    keyboards: Number
});

module.exports = mongoose.model('Player', PlayerSchema);