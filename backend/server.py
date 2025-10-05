from fastapi import FastAPI, APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
import os
import uuid

# Create app and router
app = FastAPI()
api_router = APIRouter(prefix="/api")

# MongoDB connection (will be configured with environment variables)
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'robin_taylor_portfolio')]

# Models
class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str = ""
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str
    content: str
    excerpt: str = ""
    published: bool = False
    tags: List[str] = []

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: str = ""
    author: str = "Robin J. Taylor"
    published: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    tags: List[str] = []

# Routes
@api_router.get("/")
async def root():
    return {"message": "Robin J. Taylor's Portfolio API"}

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(contact: ContactSubmissionCreate):
    contact_obj = ContactSubmission(**contact.dict())
    await db.contact_submissions.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    submissions = await db.contact_submissions.find().sort("timestamp", -1).to_list(1000)
    return [ContactSubmission(**submission) for submission in submissions]

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(blog_post: BlogPostCreate):
    blog_obj = BlogPost(**blog_post.dict())
    await db.blog_posts.insert_one(blog_obj.dict())
    return blog_obj

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(published_only: bool = True):
    filter_dict = {"published": True} if published_only else {}
    blog_posts = await db.blog_posts.find(filter_dict).sort("created_at", -1).to_list(1000)
    return [BlogPost(**blog_post) for blog_post in blog_posts]

# Include router and setup CORS
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

