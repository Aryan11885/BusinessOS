from sqlalchemy.orm import Session

from app.models.project import Project


class ProjectService:

    @staticmethod
    def create_project(
        db: Session,
        payload
    ):
        project = Project(
            organization_id=payload.organization_id,
            customer_id=payload.customer_id,

            name=payload.name,
            description=payload.description,

            status=payload.status,
            progress=payload.progress
        )

        db.add(project)
        db.commit()
        db.refresh(project)

        return project

    @staticmethod
    def get_projects(
        db: Session
    ):
        return db.query(Project).all()

    @staticmethod
    def get_project(
        db: Session,
        project_id: int
    ):
        return (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )
    
    @staticmethod
    def update_project(
        db: Session,
        project_id: int,
        payload
    ):
        project = (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )

        if not project:
            return None

        project.organization_id = payload.organization_id
        project.customer_id = payload.customer_id

        project.name = payload.name
        project.description = payload.description

        project.status = payload.status
        project.progress = payload.progress

        db.commit()
        db.refresh(project)

        return project

    @staticmethod
    def delete_project(
        db: Session,
        project_id: int
    ):
        project = (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )

        if not project:
            return None

        db.delete(project)
        db.commit()

        return True