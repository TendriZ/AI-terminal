import os
import requests

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()
API_KEY = os.getenv("API_KEY")

URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("prompt", "")

    obj_data = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    res = requests.post(URL, headers={"Content-Type": "application/json"}, 
        json=obj_data)
    if res.status_code == 200:
        reply = res.json()["candidates"][0]["content"]["parts"][0]["text"]
        return jsonify({"reply": reply})
    else:
        return jsonify({"reply": "Maaf, terjadi kesalahan. Coba lagi nanti."}, 
        res.status_code)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
