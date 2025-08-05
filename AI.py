import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY") 
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}" 
INSTRUCTION = (
    "Berikan jawaban yang lengkap dan mendalam. Jelaskan langkah-langkahnya dengan jelas, "
    "gunakan contoh jika memungkinkan. Jangan terlalu singkat. Jelaskan seolah-olah kepada pemula.\n\n"
)

def chatbotGemini(prompt):
    full_prompt = INSTRUCTION + prompt
    obj_data = {
        "contents": [{
            "parts": [{
                "text": full_prompt
            }]
        }]
    }
    res = requests.post(
        URL,
        headers={"Content-Type": "application/json"},
        json=obj_data
    )
    if res.status_code == 200:
        try:
            reply = res.json()["candidates"][0]["content"]["parts"][0]["text"]
            print(f"[AI] > {reply}\n")
        except KeyError:
            print("[AI] > [⚠️] Tidak ada respons dari API.")
    else:
        print(f"[⚠️] Error {res.status_code}: {res.text}")

print("[AI] > Halo! Aku siap membantu. (Ketik 'keluar' untuk berhenti)\n")

while True:
    user = input("[kamu] > ")
    if user.lower() == "keluar":
        print("[AI] > Sampai jumpa ya!")
        break
    else:
        chatbotGemini(user)
