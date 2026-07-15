from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.services.proposal_item_service import (
    ProposalItemService,
)

from app.schemas.proposal_item import (
    ProposalItemCreate,
    ProposalItemResponse,
)

router = APIRouter(
    prefix="/proposal-items",
    tags=["Proposal Items"],
)


@router.post(
    "",
    response_model=ProposalItemResponse
)
def create_proposal_item(
    payload: ProposalItemCreate,
    db: Session = Depends(get_db),
):
    return ProposalItemService.create_proposal_item(
        db,
        payload,
    )


@router.get(
    "",
    response_model=list[ProposalItemResponse]
)
def get_proposal_items(
    db: Session = Depends(get_db),
):
    return ProposalItemService.get_proposal_items(
        db,
    )


@router.get(
    "/{proposal_item_id}",
    response_model=ProposalItemResponse
)
def get_proposal_item(
    proposal_item_id: int,
    db: Session = Depends(get_db),
):
    proposal_item = (
        ProposalItemService.get_proposal_item(
            db,
            proposal_item_id,
        )
    )

    if not proposal_item:
        raise HTTPException(
            status_code=404,
            detail="Proposal Item not found",
        )

    return proposal_item


@router.put(
    "/{proposal_item_id}",
    response_model=ProposalItemResponse
)
def update_proposal_item(
    proposal_item_id: int,
    payload: ProposalItemCreate,
    db: Session = Depends(get_db),
):
    proposal_item = (
        ProposalItemService.update_proposal_item(
            db,
            proposal_item_id,
            payload,
        )
    )

    if not proposal_item:
        raise HTTPException(
            status_code=404,
            detail="Proposal Item not found",
        )

    return proposal_item


@router.delete(
    "/{proposal_item_id}"
)
def delete_proposal_item(
    proposal_item_id: int,
    db: Session = Depends(get_db),
):
    deleted = ProposalItemService.delete_proposal_item(
        db,
        proposal_item_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Proposal Item not found",
        )

    return {
        "message": "Proposal Item deleted successfully"
    }