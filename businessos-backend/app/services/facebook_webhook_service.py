from app.services.facebook_handlers.lead_handler import LeadHandler
from app.services.facebook_handlers.comment_handler import CommentHandler
from app.services.facebook_handlers.message_handler import MessageHandler


class FacebookWebhookService:

    @staticmethod
    def process_event(payload, db):

        print("=" * 80)
        print("Processing Facebook Event")
        print("=" * 80)

        if payload.get("object") != "page":
            return

        for entry in payload.get("entry", []):

            # Lead Ads / Feed Events
            if "changes" in entry:

                for change in entry["changes"]:

                    field = change.get("field")

                    if field == "leadgen":
                        LeadHandler.process(change, db)

                    elif field == "feed":
                        CommentHandler.process(change)

                    else:
                        FacebookWebhookService.handle_unknown(change)

            # Messenger Events
            if "messaging" in entry:

                for message in entry["messaging"]:
                    MessageHandler.process(message)

    @staticmethod
    def handle_unknown(change):

        print("=" * 80)
        print("Unknown Facebook Event")
        print("=" * 80)
        print(change)