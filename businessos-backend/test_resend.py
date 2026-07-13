import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

response = resend.Emails.send(
    {
        "from": "BusinessOS <onboarding@resend.dev>",
        "to": ["aryanapril4@gmail.com"],
        "subject": "BusinessOS Test",
        "html": "<h2>Hello from BusinessOS 🚀</h2>",
    }
)

print(response)