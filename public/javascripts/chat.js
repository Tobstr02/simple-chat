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


/**
 * Sendet eine Chat-Nachricht     ### DO NOT TOUCH WILGELM ###
 * @param username {string}
 * @param message {string}
 */
function sendChat(username, message) {
    websocket.send(JSON.stringify({event: "chat", username: username, message: message}));
}


/**
 * Sobald sich ein active state eines users ändert
 * @param data {{active: boolean, username: string}}
 */

function onState(data) {
    let p = document.createElement("p");
    if (data.active === true) {
        p.innerHTML = `<strong style="color: green">${data.username} ist beigetreten!</strong>`;
    } else if (data.active === false){
        p.innerHTML = `<strong style="color: red">${data.username} hat verlassen!</strong>`;
    }
    chatDiv.append(p);
}