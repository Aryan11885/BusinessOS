from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.leads import router as leads_router


app = FastAPI(
    title="BusinessOS API"
)

from app.api.opportunities import (
    router as opportunities_router
)

from app.api.proposals import (
    router as proposals_router
)

from app.api.customers import (
    router as customers_router
)

from app.api.projects import (
    router as projects_router
)

from app.api.tasks import (
    router as tasks_router
)

from app.api.invoices import (
    router as invoices_router,
)

from app.api.payments import (
    router as payments_router,
)

from app.api.emails import (
    router as emails_router,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://business-os-nine-virid.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(leads_router)
app.include_router(opportunities_router)
app.include_router(proposals_router)
app.include_router(customers_router)
app.include_router(projects_router)
app.include_router(tasks_router)
app.include_router(invoices_router)
app.include_router(payments_router) 
app.include_router(emails_router)


@app.get("/")
def root():
    return {
        "message": "BusinessOS API Running"
    }

@app.get("/cors-test")
def cors_test():
    return {"status": "new deployment"}

