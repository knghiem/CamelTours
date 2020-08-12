var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SlideSchema = new Schema({
  image: {type: String, required: true},
  caption: {type: String}
});

var Slide = mongoose.model('Slide', SlideSchema);
module.exports = Slide;