

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
		if(!event.wasClean)
		{
			connect();
			alert( "Verbindung verloren!\nWiederaufbau läuft..." );
		}
	}
	websocket.onmessage = (event) => {
		try {
			let data = JSON.parse(event.data);
			console.log("[WS] ", data);
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


function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

let isBlank = false;
function blank()
{
	if(isBlank)
	{
		document.getElementById("blackout").remove();
		document.title = "SimpleChat";
		isBlank = false;
	}
	else
	{
		let blackout = document.createElement("div");
		blackout.id = "blackout";
		blackout.style.position = "fixed";
		blackout.style.top = "0";
		blackout.style.bottom = "0";
		blackout.style.left = "0";
		blackout.style.right = "0";
		blackout.style.backgroundColor = "#f7f7f7";
		let img = document.createElement("img");
		img.src = "/images/blackout.jpg";
		img.classList.add("imgCenter");
		blackout.append(img);
		blackout.style.zIndex = "999";

		document.body.append(blackout);
		document.title = "Problem loading this page...";
		isBlank = true;
	}
}
document.body.onkeyup = (event) => {
	if(event.key === "b")
	{
		blank();
	}
}

connect();

