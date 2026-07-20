import requests
from datetime import datetime, timedelta
from urllib.parse import urlencode

from sqlalchemy.orm import Session

from app.core.facebook import (
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    FACEBOOK_REDIRECT_URI,
    FACEBOOK_GRAPH_API,
    FACEBOOK_CONFIG_ID,
)

from app.models.facebook_integration import FacebookIntegration


class FacebookService:

    @staticmethod
    @staticmethod
    def get_login_url():
        params = {
            "client_id": FACEBOOK_APP_ID,
            "redirect_uri": FACEBOOK_REDIRECT_URI,
            "response_type": "code",
            "config_id": FACEBOOK_CONFIG_ID,
        }
    
        url = (
            "https://www.facebook.com/v23.0/dialog/oauth?"
            + urlencode(params)
        )
    
        print("=" * 80)
        print("FACEBOOK LOGIN URL")
        print(url)
        print("=" * 80)
    
        return url

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

        print("=" * 80)
        print("FACEBOOK TOKEN REQUEST")
        print(params)
        print("=" * 80)

        print("=" * 80)
        print("FACEBOOK TOKEN RESPONSE")
        print("STATUS:", response.status_code)
        print("BODY:", response.text)
        print("=" * 80)

        if response.status_code != 200:
            try:
                raise Exception(response.json())
            except Exception:
                raise Exception(response.text)

        return response.json()

    @staticmethod
    def get_user_profile(access_token: str):

        url = f"{FACEBOOK_GRAPH_API}/me"

        params = {
            "fields": "id,name",
            "access_token": access_token,
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()

    @staticmethod
    def get_pages(access_token: str):

        url = f"{FACEBOOK_GRAPH_API}/me/accounts"

        params = {
            "access_token": access_token,
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()

    @staticmethod
    def connect_account(
        db: Session,
        organization_id: int,
        user_id: int | None,
        code: str,
    ):

        token = FacebookService.exchange_code_for_token(code)

        access_token = token["access_token"]

        user = FacebookService.get_user_profile(access_token)

        pages = FacebookService.get_pages(access_token)

        if not pages.get("data"):
            raise Exception("No Facebook Page found.")

        page = pages["data"][0]

        expires_in = token.get("expires_in")

        expires_at = None

        if expires_in:
            expires_at = datetime.utcnow() + timedelta(
                seconds=expires_in
            )

        integration = (
            db.query(FacebookIntegration)
            .filter(
                FacebookIntegration.organization_id == organization_id
            )
            .first()
        )

        if integration:

            integration.user_id = user_id
            integration.facebook_user_id = user["id"]
            integration.page_id = page["id"]
            integration.page_name = page["name"]
            integration.access_token = page["access_token"]
            integration.token_expires_at = expires_at
            integration.is_connected = True

        else:

            integration = FacebookIntegration(
                organization_id=organization_id,
                user_id=user_id,
                facebook_user_id=user["id"],
                page_id=page["id"],
                page_name=page["name"],
                access_token=page["access_token"],
                token_expires_at=expires_at,
                is_connected=True,
            )

            db.add(integration)

        db.commit()
        db.refresh(integration)

        return integration