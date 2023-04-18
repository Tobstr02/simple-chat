/**
 * Willis Code
 */
let name;

document.addEventListener("DOMContentLoaded", () => {
    name = prompt("Gib deinen Namen ein:")
});

/**
 * Sobald ein Chat hereinkommt
 * @param data {{message: string, username: username}}
 */
function onChat(data) {
    // todo Hier divs zur chatbox hinzufügen mit "Name: Message"

}


/**
 * Sendet eine Chat-Nachricht     ### DO NOT TOUCH WILGELM ###
 * @param username {string}
 * @param message {string}
 */
function sendChat(username, message) {
    websocket.send( JSON.stringify({event: "chat", username: username, message: message}) );
}


/**
 * Sobald sich ein active state eines users ändert
 * @param data {{active: boolean, username: string}}
 */
function onState(data) {
    // todo Hier divs zur chatbox vllt andere Farbe mit "Name hat verlassen" (bei active=false) bzw. "Name hat betreten" (bei active=true)
}