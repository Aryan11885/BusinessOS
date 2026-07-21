import secrets
from urllib.parse import urlencode

import requests

from app.core.google import (
    GOOGLE_AUTH_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
    GOOGLE_SCOPES,
    GOOGLE_TOKEN_URL,
)


class GmailOAuthService:

    def __init__(self):

        self.client_id = GOOGLE_CLIENT_ID
        self.client_secret = GOOGLE_CLIENT_SECRET
        self.redirect_uri = GOOGLE_REDIRECT_URI

        if not self.client_id:
            raise Exception(
                "GOOGLE_CLIENT_ID is missing"
            )

        if not self.client_secret:
            raise Exception(
                "GOOGLE_CLIENT_SECRET is missing"
            )

        if not self.redirect_uri:
            raise Exception(
                "GOOGLE_REDIRECT_URI is missing"
            )

    @staticmethod
    def generate_state():

        return secrets.token_urlsafe(32)

    def get_login_url(
        self,
        state: str | None = None,
    ):

        if not state:
            state = self.generate_state()

        params = {
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "response_type": "code",
            "scope": " ".join(GOOGLE_SCOPES),
            "access_type": "offline",
            "prompt": "consent",
            "include_granted_scopes": "true",
            "state": state,
        }

        login_url = (
            GOOGLE_AUTH_URL
            + "?"
            + urlencode(params)
        )

        return {
            "login_url": login_url,
            "state": state,
        }

    def exchange_code_for_token(
        self,
        code: str,
    ):

        payload = {
            "code": code,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": self.redirect_uri,
            "grant_type": "authorization_code",
        }

        response = requests.post(
            GOOGLE_TOKEN_URL,
            data=payload,
            timeout=30,
        )

        print("TOKEN STATUS:", response.status_code)
        print("TOKEN BODY:", response.text)


        if response.status_code != 200:

            raise Exception(
                response.text
            )

        token_data = response.json()

        print("TOKEN DATA:", token_data)

        return token_data

    def refresh_access_token(
        self,
        refresh_token: str,
    ):

        payload = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
        }

        response = requests.post(
            GOOGLE_TOKEN_URL,
            data=payload,
            timeout=30,
        )

        if response.status_code != 200:

            raise Exception(
                response.text
            )

        return response.json()
    
    def get_user_info(
        self,
        access_token: str,
    ):

      response = requests.get(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          headers={
              "Authorization": f"Bearer {access_token}"
          },
          timeout=30,
      )
      if response.status_code != 200:
          raise Exception(response.text)
      return response.json()

    def revoke_token(
        self,
        token: str,
    ):

        response = requests.post(
            "https://oauth2.googleapis.com/revoke",
            params={
                "token": token
            },
            timeout=30,
        )

        if response.status_code not in (200, 400):
            raise Exception(response.text)

        return {
            "success": True
        }

    def verify_access_token(
        self,
        access_token: str,
    ):

        response = requests.get(
            "https://www.googleapis.com/oauth2/v3/tokeninfo",
            params={
                "access_token": access_token
            },
            timeout=30,
        )

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()

    @staticmethod
    def extract_tokens(
        token_data: dict,
    ):

        return {
            "access_token": token_data.get(
                "access_token"
            ),
            "refresh_token": token_data.get(
                "refresh_token"
            ),
            "expires_in": token_data.get(
                "expires_in"
            ),
            "scope": token_data.get(
                "scope"
            ),
            "token_type": token_data.get(
                "token_type"
            ),
        }

    @staticmethod
    def format_callback_response(
        token_data: dict,
        user_data: dict,
    ):

        return {
            "success": True,
            "message": "Google account connected successfully.",
            "email": user_data.get("email"),
            "name": user_data.get("name"),
            "picture": user_data.get("picture"),
            "refresh_token": token_data.get(
                "refresh_token"
            ),
            "access_token": token_data.get(
                "access_token"
            ),
        }
    
    