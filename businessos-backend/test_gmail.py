from app.services.gmail_auth import get_credentials

creds = get_credentials()

print("Authenticated Successfully!")
print(creds)