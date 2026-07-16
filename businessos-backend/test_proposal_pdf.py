from app.pdf.proposal_template import generate_proposal_pdf

data = {
    "proposal_number": "PRO-0001",
    "title": "BusinessOS CRM Development",
    "status": "DRAFT",
    "total_amount": "125000",
}

generate_proposal_pdf(
    data,
    "proposal_test.pdf",
)

print("Proposal PDF Generated Successfully")