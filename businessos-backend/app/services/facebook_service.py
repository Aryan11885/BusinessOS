import requests
from urllib.parse import urlencode

from app.core.facebook import (
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    FACEBOOK_REDIRECT_URI,
    FACEBOOK_GRAPH_API,
    FACEBOOK_CONFIG_ID,
)

class FacebookService:

    @staticmethod
    def get_login_url():
        params = {
            "client_id": FACEBOOK_APP_ID,
            "redirect_uri": FACEBOOK_REDIRECT_URI,
            "response_type": "code",
            "config_id": FACEBOOK_CONFIG_ID,
        }

        return (
            "https://www.facebook.com/v23.0/dialog/oauth?"
            + urlencode(params)
        )

    @staticmethod
    def exchange_code_for_token(code: str):
        url = f"{FACEBOOK_GRAPH_API}/oauth/access_token"

        params = {
            "client_id": FACEBOOK_APP_ID,
            "client_secret": FACEBOOK_APP_SECRET,
            "redirect_uri": FACEBOOK_REDIRECT_URI,
            "code": code,
        }

        response = requests.get(url, params=params)
        response.raise_for_status()

        return response.json()