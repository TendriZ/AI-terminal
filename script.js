const input = document.getElementById("userInput");
const chat = document.getElementById("chat");

function sendPrompt() {
  const prompt = input.value;
  fetch("https://chatbot-gemini.rakadev.repl.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
  .then(res => res.json())
  .then(data => {
    chat.innerHTML += `<div><b>You:</b> ${prompt}</div>`;
    chat.innerHTML += `<div><b>AI:</b> ${data.response}</div>`;
  });
}
