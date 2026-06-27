from sqlalchemy.orm import Session

from app.models.task import Task


class TaskService:

    @staticmethod
    def create_task(db: Session, payload):
        task = Task(
            project_id=payload.project_id,
            title=payload.title,
            description=payload.description,
            status=payload.status,
            priority=payload.priority,
            assignee=payload.assignee
        )

        db.add(task)
        db.commit()
        db.refresh(task)

        return task

    @staticmethod
    def get_tasks(db: Session):
        return db.query(Task).all()

    @staticmethod
    def get_task(db: Session, task_id: int):
        return (
            db.query(Task)
            .filter(Task.id == task_id)
            .first()
        )

    @staticmethod
    def update_task(
        db: Session,
        task_id: int,
        payload
    ):
        task = (
            db.query(Task)
            .filter(Task.id == task_id)
            .first()
        )

        if not task:
            return None

        task.title = payload.title
        task.description = payload.description
        task.status = payload.status
        task.priority = payload.priority
        task.assignee = payload.assignee

        db.commit()
        db.refresh(task)

        return task

    @staticmethod
    def delete_task(
        db: Session,
        task_id: int
    ):
        task = (
            db.query(Task)
            .filter(Task.id == task_id)
            .first()
        )

        if not task:
            return None

        db.delete(task)
        db.commit()

        return True