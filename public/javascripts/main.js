

let websocket;
let connected = false;

function connect()
{
	const url = (window.location.protocol === "http:" ? "ws://" : "wss://") + window.location.hostname + ":3005";

	websocket = new WebSocket(
		url
	);

	websocket.onopen = (event) => {
		connected = true;
	}
	websocket.onclose = (event) => {
		connected = false;
		alert("Verbindung verloren!\nWiederaufbau läuft...");
		connect();
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

connect();

