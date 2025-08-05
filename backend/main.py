import os
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()
API_KEY = os.getenv("API_KEY")
print("API_KEY:", API_KEY)
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

app = Flask(__name__)

# Konfigurasi CORS yang lebih spesifik untuk GitHub Pages
CORS(app, origins=[
    "https://tendriz.github.io",  # Ganti dengan domain GitHub Pages Anda
    "https://*.github.io",        # Semua subdomain github.io
    "http://localhost:*",         # Untuk testing lokal
    "https://localhost:*"         # Untuk testing lokal HTTPS
], supports_credentials=True)

# Store conversation history per session
conversation_sessions = {}

@app.route("/")
def home():
    # Serve the HTML file from parent directory
    from flask import send_from_directory
    import os
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return send_from_directory(parent_dir, 'index.html')

@app.route("/style.css")
def style():
    from flask import send_from_directory
    import os
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return send_from_directory(parent_dir, 'style.css')

@app.route("/script.js")
def script():
    from flask import send_from_directory
    import os
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return send_from_directory(parent_dir, 'script.js')

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    # Handle preflight request
    if request.method == "OPTIONS":
        response = jsonify({"status": "ok"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        return response
    
    data = request.get_json()
    message = data.get("message", "")
    session_id = data.get("session_id", "default")

    # Initialize session if not exists
    if session_id not in conversation_sessions:
        conversation_sessions[session_id] = []

    # Add user message to conversation history
    conversation_sessions[session_id].append({
        "role": "user",
        "parts": [{"text": message}]
    })

    # Prepare conversation data with full history
    obj_data = {
        "contents": conversation_sessions[session_id]
    }

    res = requests.post(URL, headers={"Content-Type": "application/json"}, 
        json=obj_data)
    
    if res.status_code == 200:
        reply = res.json()["candidates"][0]["content"]["parts"][0]["text"]
        
        # Add bot response to conversation history
        conversation_sessions[session_id].append({
            "role": "model",
            "parts": [{"text": reply}]
        })
        
        response = jsonify({"response": reply})
        # Tambahkan header CORS manual
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    else:
        response = jsonify({"response": "Maaf, terjadi kesalahan. Coba lagi nanti."})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, res.status_code

@app.route("/clear", methods=["POST"])
def clear_conversation():
    data = request.get_json()
    session_id = data.get("session_id", "default")
    
    if session_id in conversation_sessions:
        conversation_sessions[session_id] = []
    
    response = jsonify({"response": "Conversation cleared"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)