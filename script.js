
let tree = {};
let current = null;

fetch('arbre_douleur_localisee.json')
    .then(response => response.json())
    .then(data => {
        tree = data;
        addBotMessage(tree.intro);
        current = tree.questions[0];
        addBotMessage(current.text);
    });

function addBotMessage(message) {
    const chat = document.getElementById("chat");
    chat.innerHTML += "<div><strong>La Petite Souris:</strong> " + message + "</div>";
}

function addUserMessage(message) {
    const chat = document.getElementById("chat");
    chat.innerHTML += "<div style='text-align:right;'><em>Vous:</em> " + message + "</div>";
}

function handleUserInput() {
    const input = document.getElementById("userInput");
    const response = input.value.trim();
    if (!response) return;

    addUserMessage(response);
    input.value = "";

    const nextKey = current.options[response];
    if (!nextKey) {
        addBotMessage("Je n'ai pas compris votre réponse. Veuillez répondre exactement par : " + Object.keys(current.options).join(" / "));
        return;
    }

    if (nextKey.startsWith("END_")) {
        addBotMessage(tree.endings[nextKey]);
    } else {
        current = tree.questions.find(q => q.id === nextKey);
        addBotMessage(current.text);
    }
}
