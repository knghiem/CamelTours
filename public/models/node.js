var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
  name: {type: String, required: true, unique: true},
  location: {type: String, required: true},
  latitude: {type: Number},
  longitude: {type: Number},
  audio: {type: String},
  slides: [{type: mongoose.Schema.Types.ObjectId, ref: 'Slide'}]
});

var Node = mongoose.model('Node', NodeSchema);
module.exports = Node;