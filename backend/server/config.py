import os
#from dotenv import load_dotenv

class Config:
    MONGO_URI = os.environ['MONGO_URI']
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']