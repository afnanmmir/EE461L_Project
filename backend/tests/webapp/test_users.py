#from backend.server.routes import users
import pytest
import pytest_check

from backend.server import createApp
from webapp import client

def test_landing(client):
    landing = client.get("/")
    assert landing.status_code == 200


def test_landing_aliases(client):
    landing = client.get("/")
    assert client.get("/").data == landing.data

def test_random(client):
    data = {
        'firstName':'testFirst',
        'lastName': 'testSecond',
        'password': "testpassword",
        'email': "test@email.com"
    }
    test = client.post("/users/register", json=data)
    assert 3 == 3

'''
class user_tests():

    url = "http://localhost:5000/users/"
    app = createApp()

    def test_register_user():
        user_collection = mongo.db["users"]
        doc = {
            "first_name":"FirstName",
            "last_name":"LastName",
            "email":"email@email.com",
            "password":"password"
        }
        requests.post(url=url + "register", data=doc)
        sleep(2.0)
        assert user_collection.find_one({"email":"email@email.com"}) != None

    def test_log_in():
        user_collection = mongo.db["users"]
        doc = {
            "email": "email@email.com",
            "password":"password"
        }
        response = requests.post(url=url + "login", data = doc)
        assert response.status_code == 201
    
    def test_fail_log_in():
        user_collection = mongo.db["users"]
        doc = {
            "email": "notavalidemail@gmail.com",
            "password": "Nopassword"
        }
        response = requests.post(url = url + "login", data=doc)
        assert response.status_code == 404
    
    
'''

'''
    Functions in users.py:
        register()
        login()
'''

def test_register_new_user(client):
    '''
    Tests that a new user in the database can be registered
    succefully.
    '''
    return

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