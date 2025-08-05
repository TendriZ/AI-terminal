const form = document.getElementById('chat-form');
const chatArea = document.getElementById('chat-area');
const input = document.getElementById('user-input');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    // Show user message
    appendMessage('user', message);
    input.value = '';
    
    // Show loading indicator
    const loadingMsg = appendMessage('bot', '💭 Thinking...');
    
    try {
        console.log('Sending request to backend...'); // Debug log
        
        const response = await fetch('https://39ce7961-2181-494f-95cd-cca1e2dd7af1-00-k7zwjwdwq87j.pike.replit.dev:5000/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: message,
                session_id: 'default' // Optional: add session support
            })
        });

        console.log('Response status:', response.status); // Debug log
        
        // Remove loading message
        chatArea.removeChild(loadingMsg);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug log
        
        if (data.response) {
            appendMessage('bot', data.response);
        } else {
            appendMessage('bot', '⚠️ No response received from server.');
        }
        
    } catch (err) {
        console.error('Detailed error:', err);
        
        // Remove loading message if it exists
        if (loadingMsg && loadingMsg.parentNode) {
            chatArea.removeChild(loadingMsg);
        }
        
        // Show detailed error message
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            appendMessage('bot', '⚠️ Cannot connect to server. Please check if the backend is running.');
        } else if (err.message.includes('Server error')) {
            appendMessage('bot', `⚠️ Server error: ${err.message}`);
        } else {
            appendMessage('bot', `⚠️ Error: ${err.message}`);
        }
    }
});

function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
    return msg; // Return element for potential removal
}

// Add welcome message
window.addEventListener('load', () => {
    appendMessage('bot', 'Hello! I am your TendriZ AI. How can I help you today?');
});

// Test backend connection on page load
window.addEventListener('load', async () => {
    try {
        const response = await fetch('https://39ce7961-2181-494f-95cd-cca1e2dd7af1-00-k7zwjwdwq87j.pike.replit.dev:5000/', {
            method: 'GET'
        });
        console.log('Backend connection test:', response.ok ? 'Success' : 'Failed');
    } catch (err) {
        console.error('Backend connection test failed:', err);
    }
});