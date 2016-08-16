//require express
var express = require('express');
//require path
var path = require('path');
//create the express app
var app = express();
//require mongoose
var mongoose = require('mongoose');
//require body-parser
var bodyParser = require('body-parser');
//connect mongoose to mongodb
mongoose.connect('mongodb://localhost/basic_mongoose');
//use body parser
app.use(bodyParser.urlencoded({extended: true}));
//to view static files
app.use(express.static(path.join(__dirname, './static')));
//to view the view files
app.set('views', path.join(__dirname, './views'));
//set the view engine
app.set('view engine', 'ejs');
//root route to render the index.ejs view
app.get('/', function(req, res){
	res.render('index');
})

var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
})
mongoose.model('User', UserSchema); 
var User = mongoose.model('User')

app.post('/users', function(req,res){
	console.log('POST DATA', req.body);
	var user = new User ({name: req.body.name, age: req.body.age});
	// .save saves the info to the database
	user.save(function(err){
		if(err){
			console.log("Something done gone wrong");
		} else {
			console.log('Successfully added user!');
			res.redirect('/');
		}
	})
})
//which port is the server listening to?
app.listen(8000, function(){
	console.log('listening on port 8000');
})