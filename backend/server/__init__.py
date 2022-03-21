from flask import Flask
from dotenv import load_dotenv
import os
import datetime
from database.extensions import *
from flask_cors import CORS
from flask_jwt_extended import JWTManager

cors = CORS()
jwt = JWTManager()

# from .config import Config

def createApp():
    load_dotenv()
    app = Flask(__name__)
    app.config['MONGO_URI'] = os.getenv('MONGO_URI')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=14)
    print(os.getenv('MONGO_URI'))
    cors.init_app(app)
    jwt.init_app(app)
    mongo.init_app(app)

    from server.routes.users import users
    from server.routes.main import main
    app.register_blueprint(main)
    app.register_blueprint(users, url_prefix='/users')

    return app