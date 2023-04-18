const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
var debug = require('debug')('simple-chat:ws');
const uuid = require("uuid");

app.use(function (req, res, next) {
	return next();
});

app.get('/', function(req, res, next){
	res.end();
});


let connections = {};
app.ws('/', function(ws, req) {
	req.id = uuid.v4();
	connections[req.id] = ws;
	ws.send(JSON.stringify({event: "ack", "id": req.id, "status": "success"}));

	ws.on('message', (msg) => {
		debug(msg);

		try {
			let data = JSON.parse(msg);
			for( const [key, value] of Object.entries(connections) )
			{
				console.log("Send msg to " + key);
				value.send(JSON.stringify(data));
			}
		} catch( e )
		{
			console.error(e);
		}
	});
	ws.on("close", (msg) =>
	{
		delete connections[req.id];
	});
	debug('New client');
	setTimeout(() => ws.send(JSON.stringify({"event": "message", "username": "SYSTEM", message: "Willkommen!"})), 3000);
});


module.exports = app;