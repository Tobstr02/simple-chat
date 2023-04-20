/**
 * Willis Code
 */
let name;

document.addEventListener("DOMContentLoaded", () => {
    name = getCookie("username");
    if(!name)
    {
        name = prompt("Gib deinen Namen ein:");
        if(!name)
            return window.location.reload();

        document.cookie = `username=${name}`;
    }
});


let chatDiv = document.getElementById("chat-box");
let chatTableDiv = document.getElementById("chat-table")
/**
 * Sobald ein Chat hereinkommt
 * @param data {{message: string, username: string}}
 */
function onChat(data) {
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdMessage = document.createElement("td");
    tdName.classList.add("table-name");
    tdMessage.classList.add("table-message");
    tr.append(tdName, tdMessage);
    tdName.innerHTML = `<strong>${data.username}</strong>`;
    tdMessage.innerHTML = data.message.replaceAll("\n", "<br>");
    chatTableDiv.append(tr);
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

let sendButton = document.getElementById("senden");
let eingabeBox = document.getElementById("eingabe");
sendButton.addEventListener("click", () => {
    sendChat(name, eingabeBox.value); //sry my bad war doch .value
    eingabeBox.value = "";
});

eingabeBox.onkeyup = (event) => {

    if(event.key.toLowerCase() === "enter" && !event.shiftKey)
    {
        console.log(event.key)
        sendChat(name, eingabeBox.value);
        eingabeBox.value = "";
    }
}


/**
 * Sendet eine Chat-Nachricht     ### DO NOT TOUCH WILGELM ###
 * @param username {string}
 * @param message {string}
 */
function sendChat(username, message) {
    let data = {event: "message", username: username, message: message};
    console.log("[WS] OUTGOING", data);
    websocket.send(JSON.stringify(data));
}


/**
 * Sobald sich ein active state eines users ändert
 * @param data {{active: boolean, username: string}}
 */

function onState(data) {
    let p = document.createElement("p");
    if (data.active === true) {
        p.innerHTML = `<strong style="color: green">${data.username} ist beigetreten!</strong>`;
    } else if (data.active === false) {
        p.innerHTML = `<strong style="color: red">${data.username} hat verlassen!</strong>`;
    }
    chatDiv.append(p);
}


/**
 *
 * @param username  {string}
 * @param active    {boolean}
 */
function sendState( username, active )
{

}