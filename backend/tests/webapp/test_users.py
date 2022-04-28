import pytest
import pytest_check
from backend.server import createApp
from webapp import client
import sys

def test_register_new_user(client):
    '''
    Tests that a new user in the database can be registered
    succefully.
    '''
    register_url = "/users/register"

    new_user = {
        "firstName":"FirstName500",
        "lastName":"LastName",
        "email":"email5@email.com",
        "password":"password"
    }

    response = client.post(register_url, json=new_user)

    print(response.data, file=sys.stderr)
    assert response.status_code == 201
    assert response.data == b'{"message":"User registered"}\n'


def test_register_existent_user(client):
    '''
    Tests that the correct error message (409) is returned
    when an attempt to register an already existent user is 
    made.
    '''
    return

def test_login_new_user(client):
    '''
    Tests that a user login of an existent user is successful.
    '''
    return

def test_login_nonexistent_user(client):
    '''
    Tests that an attempt to login a nonexistent user 
    returns the correct error message (404).
    '''
    return 

def test_login_incorrect_password(client):
    '''
    Tests that an attempt to login with an invalid password
    for a valid user (already registerd) returns the correct
    error message (401).
    '''
    return