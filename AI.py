import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY") 
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}" 
def chatbotGemini(prompt):
    full_prompt = prompt
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
status = True
while status == True:
    user = input("[kamu] > ")
    if user.lower() == "keluar":
        print("[AI] > Sampai jumpa ya!")
        exit()
    else:
        chatbotGemini(user)
        status = True
