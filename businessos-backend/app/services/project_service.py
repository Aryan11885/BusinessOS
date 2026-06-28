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

    @staticmethod
    def calculate_progress(
        db: Session,
        project_id: int
    ):
        # Import here to avoid circular imports
        from app.models.task import Task

        tasks = (
            db.query(Task)
            .filter(Task.project_id == project_id)
            .all()
        )

        if not tasks:
            project = (
                db.query(Project)
                .filter(Project.id == project_id)
                .first()
            )

            if project:
                project.progress = 0
                db.commit()

            return 0

        completed = len(
            [
                task
                for task in tasks
                if task.status == "DONE"
            ]
        )

        progress = int(
            (completed / len(tasks)) * 100
        )

        project = (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )

        if not project:
            return 0

        project.progress = progress
        db.commit()

        return progress