const form = document.getElementById("chat-form");
const input = document.getElementById("prompt-input");
const result = document.getElementById("chat-result");

// Ganti ini dengan URL Replit kamu (tanpa slash di akhir)
const BACKEND_URL = "https://39ce7961-2181-494f-95cd-cca1e2dd7af1-00-k7zwjwdwq87j.pike.replit.dev";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const prompt = input.value.trim();
  if (!prompt) return;

  result.textContent = "⏳ Loading...";

  try {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    result.textContent = data.reply;
  } catch (err) {
    result.textContent = "❌ Error: " + err.message;
  }
});
