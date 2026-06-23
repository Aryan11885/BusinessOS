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

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(leads_router)
app.include_router(opportunities_router)


@app.get("/")
def root():
    return {
        "message": "BusinessOS API Running"
    }