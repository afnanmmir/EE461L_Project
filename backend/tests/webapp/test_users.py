import pytest
import pytest_check
from backend.server import createApp
from webapp import client, database
import sys
import json

def test_register_new_user(client, database):
    '''
    Tests that a new user in the database can be registered
    succefully.
    '''
    register_url = "/users/register"

    # Delete this email from the database in case it already exists
    user_collection = database['users']
    user_collection.delete_one({'email':'testEmail@email.com'})

    # Define user dict
    new_user = {
        "firstName":"FirstNameTest",
        "lastName":"LastNameTest",
        "email":"testEmail@email.com",
        "password":"password"
    }

    # Send register request to backend
    response = client.post(register_url, json=new_user)

    # Verify the response is correct
    print(response.data, file=sys.stderr)
    assert response.status_code == 201
    assert response.data == b'{"message":"User registered"}\n'


def test_register_existent_user(client, database):
    '''
    Tests that the correct error message (409) is returned
    when an attempt to register an already existent user is 
    made.
    '''

    register_url = "/users/register"

    # Register a user into database first
    user_collection = database['users']

    new_user = {
        "firstName":"FirstNameTest",
        "lastName":"LastNameTest",
        "email":"testEmail2@email.com",
        "password":"password"
    }

    new_user_copy = {
        "firstName":"FirstNameTest",
        "lastName":"LastNameTest",
        "email":"testEmail2@email.com",
        "password":"password"
    }

    user_collection.insert_one(new_user_copy)

    # Send register request to the backend
    response = client.post(register_url, json=new_user)

    # Verify the response is the appropiate message
    assert response.status_code == 409
    assert response.data == b'Account with this email already exists'
    

def test_login_new_user(client, database):
    '''
    Tests that a user login of an existent user is successful.
    '''

    login_url = "/users/login"
    register_url = "users/register"
    
    # Register a user into database first

    email = "testEmail4@email.com"
    password = "password"

    new_user = {
        "firstName":"FirstNameTest",
        "lastName":"LastNameTest",
        "email":email,
        "password":password
    }

    response = client.post(register_url, json=new_user)

    # Define user credentials
    login_user= {
        "email":email,
        "password":password
    }

    # Send login request to the backend
    response = client.post(login_url, json=login_user)

    # Verify successful status code
    assert response.status_code == 201

    # TODO: Possibly verify the response.data
    

def test_login_nonexistent_user(client, database):
    '''
    Tests that an attempt to login a nonexistent user 
    returns the correct error message (404).
    '''

    login_url = "/users/login"

    non_existent_user = {
        "email" : "nonexistent@doesntexist.edu",
        "password" : "password"
    }

    # Send login request to the backend
    response = client.post(login_url, json=non_existent_user)

    # Verify status code and data message
    assert response.status_code == 404
    assert response.data == b'{"message":"User with this email does not yet exist","user_email":""}\n'


def test_login_incorrect_password(client, database):
    '''
    Tests that an attempt to login with an invalid password
    for a valid user (already registerd) returns the correct
    error message (401).
    '''

    login_url = "/users/login"
    register_url = "users/register"
    
    # Register a user into database first
    email = "testEmail5@email.com"
    password = "password"

    new_user = {
        "firstName":"FirstNameTest",
        "lastName":"LastNameTest",
        "email":email,
        "password":password
    }

    response = client.post(register_url, json=new_user)

    # Define user credentials with incorrect password
    login_user= {
        "email":email,
        "password":password + "1"
    }

    response = client.post(login_url, json=login_user)

    # Verify status code and data message
    assert response.status_code == 401
    assert response.data == b'{"message":"Password is incorrect","user_email":""}\n'



