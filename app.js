var Express = require('express');
var bodyParser = require ("body-parser");
var logger = require('morgan');
var mongoose   = require('mongoose');


var app = new Express();
var router = Express.Router();
var Player = require('./models/player');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');
// mongoose.connect('mongodb://danielsousat:calangot17@ds119718.mlab.com:19718/idlegameyano/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});

// Setup Port
app.set('port', (process.env.PORT || 5000));
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

router.route('/player')
    .post(function(req, res) {

        var player = new Player();    
        player.name = req.body.name;
        player.money = req.body.money;
        player.interns = req.body.interns;
        player.geeks = req.body.geeks;
        player.manishes = req.body.manishes;
        player.yanos = req.body.yanos;
        player.bills = req.body.bills;
        player.keyboards = req.body.keyboards;
        
    	Player.findOne( {name: player.name} , function(err, object){
    		if(err)
    			res.send(err);
    		if( object == null ){
    			player.save(function(err) {
	    	    	if (err)
	    	        	res.send(err);
		    	   	res.send(player);
		    	});
    		}
    		else{
    			res.send(object);
    		}
    	});

    })
    .get(function(req, res) {
        Player.find(function(err, players) {
            if (err)
                res.send(err);

            res.json(players);
        });
    });


app.use('/', router);

app.listen(app.get('port'), function(){
	console.log("Server listening to port " + app.get('port'));
});

module.exports = app;
exports.test = function(req,res) {
  res.render('test');
};