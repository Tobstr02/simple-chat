

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
		try {
			let data = JSON.parse(event.data);
			if(data.event === "status")
			{
				console.log("Incoming status from " + data.username );
				onState({username: data.username, active: data.active})
			}
			else if( data.event === "message" )
			{
				console.log("Incoming message from " + data.username );
				onChat({username: data.username, message: data.message});
			}
		} catch( e )
		{
			console.error("Error while parsing data " + e );
		}

	}

}


