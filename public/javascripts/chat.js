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
let chatDiv = document.getElementById("chat-box");
function onChat(data) {
    // todo Hier divs zur chatbox hinzufügen mit "Name: Message"
    let p = document.createElement("p");
    p.innerHTML = `<strong>${data.username}</strong>: ${data.message}`;
    chatDiv.append(p);
}

let sendButton = document.getElementById("senden");
let eingabeBox = document.getElementById("eingabe");
sendButton.addEventListener("click", () => {
    sendChat(name, eingabeBox.innerText);
});

function sendChat(username, message) {

}


/**
 * Sobald sich ein active state eines users ändert
 * @param data {username: string, active: boolean}
 */
function onState(data) {
    // todo Hier divs zur chatbox vllt andere Farbe mit "Name hat verlassen" (bei active=false) bzw. "Name hat betreten" (bei active=true)
}