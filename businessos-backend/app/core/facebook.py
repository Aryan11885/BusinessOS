import os
from dotenv import load_dotenv

load_dotenv()

FACEBOOK_APP_ID = os.getenv("FACEBOOK_APP_ID")
FACEBOOK_APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")
FACEBOOK_REDIRECT_URI = os.getenv("FACEBOOK_REDIRECT_URI")
FACEBOOK_CONFIG_ID = os.getenv("FACEBOOK_CONFIG_ID")
FACEBOOK_GRAPH_API = os.getenv(
    "FACEBOOK_GRAPH_API",
    "https://graph.facebook.com/v23.0",
)