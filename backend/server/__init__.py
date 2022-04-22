"""
Initializes the flask app with all necessary configurations. First, app is configured with MONGO_URI, which is provided in the .env
file. It is then configured with the JWT_SECRET_KEY and its expiration time, also in the .env file.
The app then has a cors and JWTManager that it needs to be initialized with:
    CORS():
        - This allows the frontend to communicate with the front end using axios without violationg any security protocols.
    JWTManager():
        - This is a security measure that prevents any unauthorized user from accessing any of the URL's that are restricted 
        to authorized users. This means unauthorized users will not be able to modify projects and users and access data.
The app is then registered with flask blueprints from the routes directory. Blueprints are similar to instances of Flask, but it allows
the app to be more modular. This allows us to separate functions dealing with users, datasets, and projects.
Documentation on blueprints: https://flask.palletsprojects.com/en/2.0.x/blueprints/
"""

from flask import Flask
from dotenv import load_dotenv
import os
import datetime
from database.extensions import * #import the database from database directory
from flask_cors import CORS # Import CORS class
from flask_jwt_extended import JWTManager # Import JWTManager Class

cors = CORS()
jwt = JWTManager()

# from .config import Config

def createApp():
    """
    creates the app with all proper configurations and registers all necessary blueprints for use

    Parameters
    ----------
    None

    Returns
    -------
    Instance of a Flask app.
    """
    load_dotenv()
    app = Flask(__name__, static_folder='../../client/build', static_url_path='/')
    app.config['MONGO_URI'] = os.getenv('MONGO_URI')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=14)
    cors.init_app(app) # Configure the app with cors instance
    jwt.init_app(app) # Configure the app with the jwt manager
    mongo.init_app(app) # Configure the app with the PyMongo client instance

    @app.route("/")
    def home():
        return app.send_static_file('index.html')

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    from server.routes.users import users
    from server.routes.hardware import hardware
    from server.routes.projects import projects
    from server.routes.main import main
    # app.register_blueprint(main)
    app.register_blueprint(users, url_prefix='/users')
    app.register_blueprint(hardware, url_prefix='/hardware')
    app.register_blueprint(projects, url_prefix='/projects')

    return app