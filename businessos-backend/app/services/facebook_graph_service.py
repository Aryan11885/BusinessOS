import requests

from app.core.facebook import FACEBOOK_GRAPH_API


class FacebookGraphService:

    @staticmethod
    def get_lead(leadgen_id: str, access_token: str):

        url = f"{FACEBOOK_GRAPH_API}/{leadgen_id}"

        params = {
            "access_token": access_token
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()

    @staticmethod
    def get_comment(comment_id: str, access_token: str):

        url = f"{FACEBOOK_GRAPH_API}/{comment_id}"

        params = {
            "fields": "id,message,from,created_time",
            "access_token": access_token,
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()

    @staticmethod
    def get_post(post_id: str, access_token: str):

        url = f"{FACEBOOK_GRAPH_API}/{post_id}"

        params = {
            "fields": "id,message,created_time",
            "access_token": access_token,
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()

    @staticmethod
    def get_profile(user_id: str, access_token: str):

        url = f"{FACEBOOK_GRAPH_API}/{user_id}"

        params = {
            "fields": "id,name",
            "access_token": access_token,
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            raise Exception(response.text)

        return response.json()