//require express
var express = require('express');
//require path
var path = require('path');
//create the express app
var app = express();
//require body-parser
var bodyParser = require('body-parser');
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
app.post('/results', function(req,res){
	var user_data = {
		name: req.body.name,
		email: req.body.email,
		location: req.body.location,
		language: req.body.language,
		comment: req.body.comment
	}
	res.render('results', {userdata: user_data});
})
//which port is the server listening to?
app.listen(8000, function(){
	console.log('listening on port 8000');
})