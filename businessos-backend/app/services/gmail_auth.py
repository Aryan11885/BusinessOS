import os
from google.oauth2.credentials import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/gmail.send",
]

def get_credentials():
    print("CLIENT_ID:", os.getenv("GOOGLE_CLIENT_ID"))
    print("CLIENT_SECRET:", "Present" if os.getenv("GOOGLE_CLIENT_SECRET") else "Missing")
    print("REFRESH_TOKEN:", "Present" if os.getenv("GOOGLE_REFRESH_TOKEN") else "Missing")

    return Credentials(
        token=None,
        refresh_token=os.getenv("GOOGLE_REFRESH_TOKEN"),
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        scopes=SCOPES,
    )