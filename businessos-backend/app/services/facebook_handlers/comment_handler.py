class CommentHandler:

    @staticmethod
    def process(change):

        print("=" * 80)
        print("FACEBOOK COMMENT EVENT")
        print("=" * 80)

        value = change.get("value", {})

        comment_id = value.get("comment_id")
        post_id = value.get("post_id")
        sender_id = value.get("sender_id")

        print(f"Comment ID : {comment_id}")
        print(f"Post ID    : {post_id}")
        print(f"Sender ID  : {sender_id}")

        # Evening:
        # Fetch comment using Graph API

        # Save into Activity Table