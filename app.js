var Express = require('express');
var bodyParser = require ("body-parser");
var logger = require('morgan');


var app = new Express();
var router = Express.Router();


//Setup Port
var port = 8080;
app.set('port', port);

//Logger
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', Express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

router.get('/', function(req, res){
	res.sendFile(__dirname + '/view/idlegame.html');
});

app.use('/', router);

app.listen(app.get('port'), function(){
	console.log("Server listening to port " + app.get('port'));
});

module.exports = app;