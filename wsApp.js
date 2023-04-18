const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
var debug = require('debug')('simple-chat:ws');

app.use(function (req, res, next) {
	return next();
});

app.get('/', function(req, res, next){
	res.end();
});


app.ws('/', function(ws, req) {

	ws.on('message', function(msg) {
		debug(msg);

		try {
			let data = JSON.parse(msg);
			expressWs.clients.forEach( (client) => {
				client.send(JSON.stringify(data));
			} )
		} catch( e )
		{}
	});
	debug('New client');
	ws.send(JSON.stringify({"username": "SYSTEM", message: "Willkommen!"}))
});


module.exports = app;