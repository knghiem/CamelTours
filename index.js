const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
//Use ./ for relative paths
const Tour = require('./public/models/tour.js');
const Node = require('./public/models/node.js') 

const app = express();
app.use(express.static(path.join(__dirname + '/public')));

//Set view engine
app.set("views", path.join(__dirname + "/public/views"));
app.set('view engine', 'pug');

//Allow us to parse incoming requests with JSON
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/cameltours', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

//Add a new tour
app.post('/tour', (req, res) => {
    const data = req.body
    var new_tour = new Tour(data) 
  
    new_tour.save(function (error) {
      if (error) {
        console.log(error)
      } else {
        console.log("Created a new tour with data as follows:")
        console.log(new_tour)
      }   
    })
  })

//Add a new node
app.post('/node', (req, res) => {
  const data = req.body
  var new_node = new Node(data) 

  new_node.save(function (error) {
    if (error) {
      console.log(error)
    } else {
      console.log("Created a new node with data as follows:")
      console.log(new_node)
    }   
  })
})


app.get('/', (req,res) => res.render('index'))
app.get('/faq', (req,res) => res.render('faq'))
app.get('/tour', (req,res) => res.render('tour'))
//Get a specific tour
app.get('/tour/:id_name', async (req, res) => {
  Tour.findOne({id_name: req.params.id_name}, function(error, tour_data) {
    if (tour_data == null) { 
      console.log("Cannot find tour with name " + req.params.id_name)
      res.render('404')
    } else{
      //Remove _id field to avoid syntax error
      tour_data = tour_data.toJSON();
      delete tour_data._id
      tour_data_string = JSON.stringify(tour_data)
      res.render('tour', {tour_data:tour_data_string} )
    }
  })
})
/*
In backend:
- Create a route /get_nodes(tour_id)
- Retrieve node data from database
- Send node data from database as json
-https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
*/
app.post('/get_nodes', async (req, res) => {
  //Locate the tour with the given id name
  Tour.findOne({id_name: req.body.id_name}, function(error, tour_data) {
    if (tour_data == null) { 
      console.log("Cannot find tour with name " + req.params.id_name)
    } else{
       //Delete default _id field, since only id_name is necessary to identify tours
       delete tour_data._id 
      //Convert all id strings for nodes to mongodb object ids
      node_object_ids = tour_data.nodes.map(id => mongoose.Types.ObjectId(id))
      model.find({
        '_id': { $in: node_object_ids}
        }, function(err, nodes_data){
            if (err){
              console.log(err)
            } else{
              res.json(nodes_data)
            }       
      })    
    }
  })
});
 
/*   
      //Get all nodes associated with that tour
      function getNodes(){
        for (i = 0; i <  tour_data.nodes.length; i++){
        node_id = tour_data.nodes[i]
        Node.findOne({_id: node_id}, function(error, node_data) {
          if (node_data != null) { 
            tour_data.nodes[i] = node_data
          }
        })
       }
      }
      tour_data = await getNodes()
*/
app.listen(3000, () => console.log("listening at port 3000"));