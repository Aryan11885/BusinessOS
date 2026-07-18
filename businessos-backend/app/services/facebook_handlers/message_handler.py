class MessageHandler:

    @staticmethod
    def process(message):

        print("=" * 80)
        print("FACEBOOK MESSENGER EVENT")
        print("=" * 80)

        sender = message.get("sender", {})
        recipient = message.get("recipient", {})
        message_data = message.get("message", {})

        sender_id = sender.get("id")
        recipient_id = recipient.get("id")
        message_id = message_data.get("mid")
        text = message_data.get("text")

        print(f"Sender ID    : {sender_id}")
        print(f"Recipient ID : {recipient_id}")
        print(f"Message ID   : {message_id}")
        print(f"Text         : {text}")

        # Evening:
        # Save conversation
        # Save message