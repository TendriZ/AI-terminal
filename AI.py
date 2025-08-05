import requests
import os

API_KEY = os.getenv("API_KEY", "AIzaSyCjqm13TNHjAEiTnitaPORXXjzohUKDcbU")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

def chatbotGemini(prompt):
    user_prompt = prompt
    obj_data = {
        "contents":[{
            "parts":[{
                "text": user_prompt
            }]
        }]
    }
    res = requests.post(
        URL,
        headers = {"Content-Type":"application/json"},
        json = obj_data
    )
    if res.status_code == 200:
        print(res.json()["candidates"][0]["content"]["parts"][0]["text"])
    else:
        print(f"Error: {res.status_code}")

print("[AI] > Halo ada yang bisa saya bantu? (Ketik 'keluar' untuk berhenti)")

while True:
    user = input("[kamu] >")
    if user == "keluar":
        print("[AI] > Sayonara")
        exit()
    else:
        chatbotGemini(user)

