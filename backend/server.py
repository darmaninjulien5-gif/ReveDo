from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Rêv'dô API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    city: str
    problem_type: str
    phone: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuoteRequestCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    city: str = Field(..., min_length=1, max_length=120)
    problem_type: str = Field(..., min_length=1, max_length=200)
    phone: Optional[str] = Field(None, max_length=40)
    message: Optional[str] = Field(None, max_length=2000)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Rêv'dô API - L'excellence de la piscine à La Réunion"}


@api_router.post("/quote-request", response_model=QuoteRequest)
async def create_quote_request(payload: QuoteRequestCreate):
    try:
        obj = QuoteRequest(**payload.model_dump())
        doc = obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.quote_requests.insert_one(doc)
        logger.info(f"New quote request stored id={obj.id} city={obj.city}")
        return obj
    except Exception as e:
        logger.error(f"Error creating quote request: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement de la demande")


@api_router.get("/quote-request", response_model=List[QuoteRequest])
async def list_quote_requests():
    items = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for item in items:
        if isinstance(item.get('created_at'), str):
            try:
                item['created_at'] = datetime.fromisoformat(item['created_at'])
            except Exception:
                pass
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
