"""
users.py contains all the URL's in the backend that deal with user actions. This includes logging in and signing up for an account
"""
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

import sys

from backend.database.extensions import mongo
from backend.util.JSONEncoder import JSONEncoder
from backend.util.encryption_module import EncryptionModule

users = Blueprint('users', __name__)

encoder = JSONEncoder()

database = mongo.db # Gets the database instance of the PyMongo client
encryption = EncryptionModule(database)
user_collection = database.users # Accesses the user collection of the databse


@users.route('/register', methods=["POST"])
def register():
    """
    POST users/register

    Method to register a new user to a new account. Checks to see whether
    the user already exists. If user exists, return error. If user does not exist,
    add user to the database.

    Parameters
    ----------
    None.

    Returns
    -------
    201: message of registered user
    409: Account with this email already exists

    """
    req = request.get_json()
    user_email = req['email']

    print(mongo, file=sys.stderr)
    print(database, file=sys.stderr)
    print(user_collection.find(), file=sys.stderr)
    user = user_collection.find_one()
    '''
    print(f"User {user}")
    if(user_collection == None):
        encrypted_password = encryption.gen_hashed_password_with_salt(req['passowrd'])
        doc = {
                "first_name": req["firstName"],
                "last_name": req["lastName"],
                "email": req["email"],
                "password": encrypted_password
            }
        user_collection.insert_one(doc)
        # print("This worked first time!")
        return {
            'message': "User registered"
        }, 201
    else:
        if(user):
            return "Account with this email already exists", 409
        else:
            encrypted_password = encryption.gen_hashed_password_with_salt(req['password'])
            doc = {
                "first_name": req["firstName"],
                "last_name": req["lastName"],
                "email": req["email"],
                "password": encrypted_password
            }
            user_collection.insert_one(doc)
            print("This worked!")
            return {
                'message': "User registered"
            }, 201
    '''
    return {
                'message': "User registered"
            }, 201

@users.route('/login', methods=["POST"])
def login():
    """
    POST users/login

    Attempts to log in a user to the app. Checks to see if account with inputted email exists.
    Checks if password of existing user matches inputted password.

    Parameters
    ----------
    None.

    Returns
    -------
    201: Authentication token, user email, and success message
    404: User with email does not exist
    409: Password was incorrect.
    """
    print("made it here.")
    req = request.get_json()
    user_email = req["email"]
    user_password = req["password"]
    user = user_collection.find_one({"email": user_email})
    if(not user):
        return {
            'message': 'User with this email does not yet exist',
            'user_email': '',
        }, 404
    if(not(encryption.verify_password(user_password, user['password']))):
        return {
            'message': 'Password is incorrect',
            'user_email': ''
        }, 401
    print(user)
    access_token = create_access_token(identity=encoder.encode(user))
    return {
        'message': 'User submitted',
        'user': user_email,
        'token': access_token
    }, 201