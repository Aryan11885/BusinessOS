from sqlalchemy.orm import Session

from app.models.proposal_item import ProposalItem
from app.models.proposal import Proposal


class ProposalItemService:

    @staticmethod
    def calculate_line_total(
        quantity: float,
        unit_price: float,
        discount: float,
        tax_percentage: float,
    ):
        taxable_amount = (quantity * unit_price) - discount

        tax_amount = (
            taxable_amount * tax_percentage
        ) / 100

        return taxable_amount + tax_amount

    @staticmethod
    def update_proposal_totals(
        db: Session,
        proposal_id: int,
    ):
        proposal = (
            db.query(Proposal)
            .filter(
                Proposal.id == proposal_id
            )
            .first()
        )

        if not proposal:
            return

        proposal_items = (
            db.query(ProposalItem)
            .filter(
                ProposalItem.proposal_id == proposal_id
            )
            .all()
        )

        subtotal = 0
        total_discount = 0
        total_tax = 0
        total_amount = 0

        for item in proposal_items:

            taxable = (
                item.quantity * item.unit_price
            ) - item.discount

            tax = (
                taxable * item.tax_percentage
            ) / 100

            subtotal += taxable
            total_discount += item.discount
            total_tax += tax
            total_amount += item.line_total

        proposal.subtotal = subtotal
        proposal.discount = total_discount
        proposal.tax = total_tax
        proposal.total_amount = total_amount

        db.commit()

    @staticmethod
    def create_proposal_item(
        db: Session,
        payload,
    ):
        line_total = ProposalItemService.calculate_line_total(
            payload.quantity,
            payload.unit_price,
            payload.discount,
            payload.tax_percentage,
        )

        proposal_item = ProposalItem(
            proposal_id=payload.proposal_id,
            item_name=payload.item_name,
            description=payload.description,
            quantity=payload.quantity,
            unit=payload.unit,
            unit_price=payload.unit_price,
            discount=payload.discount,
            tax_percentage=payload.tax_percentage,
            line_total=line_total,
        )

        db.add(proposal_item)
        db.commit()
        db.refresh(proposal_item)

        ProposalItemService.update_proposal_totals(
            db,
            proposal_item.proposal_id,
        )

        return proposal_item

    @staticmethod
    def get_proposal_items(
        db: Session,
    ):
        return db.query(ProposalItem).all()

    @staticmethod
    def get_proposal_item(
        db: Session,
        proposal_item_id: int,
    ):
        return (
            db.query(ProposalItem)
            .filter(
                ProposalItem.id == proposal_item_id
            )
            .first()
        )

    @staticmethod
    def update_proposal_item(
        db: Session,
        proposal_item_id: int,
        payload,
    ):
        proposal_item = (
            db.query(ProposalItem)
            .filter(
                ProposalItem.id == proposal_item_id
            )
            .first()
        )

        if not proposal_item:
            return None

        proposal_item.proposal_id = payload.proposal_id
        proposal_item.item_name = payload.item_name
        proposal_item.description = payload.description
        proposal_item.quantity = payload.quantity
        proposal_item.unit = payload.unit
        proposal_item.unit_price = payload.unit_price
        proposal_item.discount = payload.discount
        proposal_item.tax_percentage = payload.tax_percentage

        proposal_item.line_total = (
            ProposalItemService.calculate_line_total(
                payload.quantity,
                payload.unit_price,
                payload.discount,
                payload.tax_percentage,
            )
        )

        db.commit()
        db.refresh(proposal_item)

        ProposalItemService.update_proposal_totals(
            db,
            proposal_item.proposal_id,
        )

        return proposal_item

    @staticmethod
    def delete_proposal_item(
        db: Session,
        proposal_item_id: int,
    ):
        proposal_item = (
            db.query(ProposalItem)
            .filter(
                ProposalItem.id == proposal_item_id
            )
            .first()
        )

        if not proposal_item:
            return None

        proposal_id = proposal_item.proposal_id

        db.delete(proposal_item)
        db.commit()

        ProposalItemService.update_proposal_totals(
            db,
            proposal_id,
        )

        return True