"""
users.py contains all the URL's in the backend that deal with user actions. This includes logging in and signing up for an account
"""
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

import sys


from database.extensions import mongo
from util.JSONEncoder import JSONEncoder

users = Blueprint('users', __name__)

encoder = JSONEncoder()

database = mongo.db # Gets the database instance of the PyMongo client
print(database.list_collection_names())
user_collection = database['users'] # Accesses the user collection of the databse
print(user_collection)




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
    user = user_collection.find_one({'email':user_email})
    print(f"User {user}")
    if(user_collection == None):
        doc = {
                "first_name": req["firstName"],
                "last_name": req["lastName"],
                "email": req["email"],
                "password": req["password"]
            }
        user_collection.insert_one(doc)
        print("This worked first time!")
        return {
            'message': "User registered"
        }, 201
    else:
        if(user):
            return "Account with this email already exists", 409
        else:
            doc = {
                "first_name": req["firstName"],
                "last_name": req["lastName"],
                "email": req["email"],
                "password": req["password"]
            }
            user_collection.insert_one(doc)
            print("This worked!")
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
    if(user_password != user['password']):
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