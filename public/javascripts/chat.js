/**
 * Willis Code
 */



/**
 * Sobald ein Chat hereinkommt
 * @param data {{message: string, username: username}}
 */
function onChat(data)
{
	// todo Hier divs zur chatbox hinzufügen mit "Name: Message"
}

function sendChat(username, message)
{

}


/**
 * Sobald sich ein active state eines users ändert
 * @param data {username: string, active: boolean}
 */
function onState(data)
{
	// todo Hier divs zur chatbox vllt andere Farbe mit "Name hat verlassen" (bei active=false) bzw. "Name hat betreten" (bei active=true)
}