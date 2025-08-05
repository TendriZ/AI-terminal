
const form = document.getElementById('chat-form');
const chatArea = document.getElementById('chat-area');
const input = document.getElementById('user-input');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    appendMessage('user', message);
    input.value = '';

    try {
        // Use relative URL to work with current domain
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        appendMessage('bot', data.response);
    } catch (err) {
        console.error('Error:', err);
        appendMessage('bot', '⚠️ Error connecting to server.');
    }
});

function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Add welcome message
window.addEventListener('load', () => {
    appendMessage('bot', 'Hello! I am your Gemini chatbot. How can I help you today?');
});
