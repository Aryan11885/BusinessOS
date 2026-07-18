class FacebookFieldParser:

    @staticmethod
    def parse(field_data):

        parsed = {}

        for field in field_data:

            name = field.get("name")

            values = field.get("values", [])

            parsed[name] = values[0] if values else None

        return parsed