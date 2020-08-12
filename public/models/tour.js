var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TourSchema = new Schema({
  id_name: {type: String, required: true, unique: true},
  display_name: {type: String, required: true, unique: true},
  location: {type: String, required: true},
  latitude: {type: Number},
  longitude: {type: Number},
  visibility: {type: String, default: 'private', enum: ['private','public'] },
  nodes: [{type: String, ref: 'Node'}]/*go back to ensure ref correct*/
});

var Tour = mongoose.model('Tour', TourSchema);
module.exports = Tour;