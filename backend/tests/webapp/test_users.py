#from backend.server.routes import users
import pytest
import pytest_check

from backend.server import createApp
from webapp import client
import json


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
    assert 2 == 3

'''
    Functions in users.py:
        register()
        login()
'''

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
