from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
from collections import defaultdict, deque
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


# ---------- Simple in-memory rate limiter (anti spam) ----------
# 5 quote-requests per IP per 10 minutes
RATE_LIMIT_WINDOW = 600  # seconds
RATE_LIMIT_MAX = 5
_ip_hits: dict = defaultdict(lambda: deque())


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _check_rate_limit(ip: str) -> None:
    now = time.time()
    q = _ip_hits[ip]
    while q and now - q[0] > RATE_LIMIT_WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT_MAX:
        raise HTTPException(status_code=429, detail="Trop de demandes. Merci de réessayer plus tard.")
    q.append(now)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Rêv'dô API - L'excellence de la piscine à La Réunion"}


@api_router.get("/health")
async def health():
    """Lightweight health endpoint for uptime monitoring (e.g. UptimeRobot)."""
    return {"status": "ok", "ts": datetime.now(timezone.utc).isoformat()}


@api_router.post("/quote-request", response_model=QuoteRequest)
async def create_quote_request(payload: QuoteRequestCreate, request: Request):
    _check_rate_limit(_client_ip(request))
    try:
        obj = QuoteRequest(**payload.model_dump())
        doc = obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.quote_requests.insert_one(doc)
        logger.info(f"New quote request stored id={obj.id} city={obj.city}")
        return obj
    except HTTPException:
        raise
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

# ---------- CORS ----------
# In production set CORS_ORIGINS env var, e.g.: https://revedo.re,https://www.revedo.re
_origins_env = os.environ.get('CORS_ORIGINS', '*')
allow_origins = [o.strip() for o in _origins_env.split(',') if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=600,
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
