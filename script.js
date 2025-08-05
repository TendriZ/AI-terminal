const form = document.getElementById('chat-form');
const chatArea = document.getElementById('chat-area');
const input = document.getElementById('user-input');

// Key untuk localStorage
const CHAT_HISTORY_KEY = 'gemini_chat_history';
const SESSION_ID_KEY = 'gemini_session_id';

// Generate atau ambil session ID
let sessionId = localStorage.getItem(SESSION_ID_KEY);
if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(SESSION_ID_KEY, sessionId);
}

// Fungsi untuk menyimpan chat history
function saveChatHistory() {
    const messages = [];
    const messageElements = chatArea.querySelectorAll('.message');
    
    messageElements.forEach(msg => {
        if (msg.classList.contains('user')) {
            messages.push({
                sender: 'user',
                text: msg.textContent
            });
        } else if (msg.classList.contains('bot')) {
            messages.push({
                sender: 'bot', 
                text: msg.textContent
            });
        }
    });
    
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
}

// Fungsi untuk memuat chat history
function loadChatHistory() {
    const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (savedHistory) {
        const messages = JSON.parse(savedHistory);
        
        // Clear chat area terlebih dahulu
        chatArea.innerHTML = '';
        
        // Tambahkan setiap pesan
        messages.forEach(msg => {
            appendMessage(msg.sender, msg.text, false); // false = jangan save lagi
        });
    }
}

// Fungsi untuk clear chat history
function clearChatHistory() {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    chatArea.innerHTML = '';
    appendMessage('bot', 'Hello! I am your Gemini chatbot. How can I help you today?');
}

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
                session_id: sessionId
            })
        });

        console.log('Response status:', response.status); // Debug log
        
        // Remove loading message
        if (loadingMsg && loadingMsg.parentNode) {
            chatArea.removeChild(loadingMsg);
        }

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

function appendMessage(sender, text, shouldSave = true) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
    
    // Save to localStorage setelah menambah pesan (kecuali saat loading)
    if (shouldSave) {
        saveChatHistory();
    }
    
    return msg; // Return element for potential removal
}

// Load chat history saat halaman dimuat
window.addEventListener('load', () => {
    loadChatHistory();
    
    // Jika tidak ada history, tampilkan welcome message
    if (chatArea.children.length === 0) {
        appendMessage('bot', 'Hello! I am your Gemini chatbot. How can I help you today?');
    }
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

// Setup tombol clear chat
window.addEventListener('load', () => {
    const clearBtn = document.getElementById('clear-chat-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all chat history?')) {
                clearChatHistory();
            }
        });
    }
});