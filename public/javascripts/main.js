

let websocket;
let connected = false;

function connect()
{
	websocket = new WebSocket(
		"wss://www.example.com/socketserver"
	);

	websocket.onopen = (event) => {
		connected = true;
	}
	websocket.onclose = (event) => {
		connected = false;
	}
	websocket.onmessage = (event) => {

	}

}


