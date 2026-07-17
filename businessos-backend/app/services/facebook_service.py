from urllib.parse import urlencode

from app.core.facebook import (
    FACEBOOK_APP_ID,
    FACEBOOK_REDIRECT_URI,
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