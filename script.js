const input = document.getElementById("userInput");
const chat = document.getElementById("chat");

function sendPrompt() {
  const prompt = input.value;
  fetch("https://39ce7961-2181-494f-95cd-cca1e2dd7af1-00-k7zwjwdwq87j.pike.replit.dev/", {
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
