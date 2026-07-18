from app.services.facebook_graph_service import FacebookGraphService
from app.services.facebook_field_parser import FacebookFieldParser
from app.services.facebook_lead_mapper import FacebookLeadMapper
from app.services.lead_service import LeadService
from app.services.facebook_integration_service import FacebookIntegrationService


class LeadHandler:

    @staticmethod
    def process(change, db):

        print("=" * 80)
        print("FACEBOOK LEAD EVENT")
        print("=" * 80)

        value = change.get("value", {})

        leadgen_id = value.get("leadgen_id")
        page_id = value.get("page_id")
        form_id = value.get("form_id")

        print(f"Lead ID : {leadgen_id}")
        print(f"Page ID : {page_id}")
        print(f"Form ID : {form_id}")

        integration = FacebookIntegrationService.get_by_page_id(
            db=db,
            page_id=page_id,
        )
        
        if not integration:
            raise Exception(
                f"No connected Facebook page found for page_id: {page_id}"
            )
        
        graph_response = FacebookGraphService.get_lead(
            leadgen_id=leadgen_id,
            access_token=integration.access_token,
        )
        
        fields = FacebookFieldParser.parse(
            graph_response["field_data"]
        )

        print(fields)

        # Step 18.4
        lead = FacebookLeadMapper.to_lead_create(fields)

        print(lead)

        print("Generated Lead Code:", lead.lead_code)

        # Step 19
        created_lead = LeadService.create_lead(
            db=db,
            payload=lead
        )
        
        print("=" * 80)
        print("LEAD SAVED SUCCESSFULLY")
        print("=" * 80)
        print(f"Database ID : {created_lead.id}")
        print(f"Lead Code   : {created_lead.lead_code}")

        # Step 20 (After Meta Access)
        # access_token = "<PAGE_ACCESS_TOKEN>"
        #
        # graph_response = FacebookGraphService.get_lead(
        #     leadgen_id,
        #     access_token
        # )