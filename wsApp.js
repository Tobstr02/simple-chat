const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
var debug = require('debug')('simple-chat:ws');
const uuid = require("uuid");
const forbidden = require("./forbidden.json");

app.use(function (req, res, next) {
	return next();
});

app.get('/', function(req, res, next){
	res.end();
});

let messages = [];


let connections = {};
app.ws('/', function(ws, req) {
	req.id = uuid.v4();
	connections[req.id] = ws;
	ws.send(JSON.stringify({event: "ack", "id": req.id, "status": "success"}));

	ws.on('message', (msg) => {
		debug(msg);

		try {
			let data = JSON.parse(msg);
			if(data.event === "message" && !data.message.trim() )
			{
				return ws.send(JSON.stringify({"event": "message", "username": "<i>SYSTEM</i>", message: "Bitte gebe eine gültige Nachricht ein!"}))
			}
			if(data.event === "message")
			{

				for( let word of forbidden )
				{
					var regEx = new RegExp(word, "ig");
					data.message = data.message.replaceAll(regEx, "*".repeat(word.length));
				}
			}

			if( !data.username )
			{
				data.username = "Anonymous";
			}


			for( const [key, value] of Object.entries(connections) )
			{
				console.log("Send msg to " + key);
				value.send(JSON.stringify(data));
			}
			if( data.event === "message" || data.event === "state" )
				messages.push(data);
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
	setTimeout(() => {
		for(let msg of messages)
			ws.send(JSON.stringify(msg));
		ws.send(JSON.stringify({"event": "message", "username": "<i>SYSTEM</i>", message: "Verbunden mit IRC#1"}))
	}, 500);
});


module.exports = app;