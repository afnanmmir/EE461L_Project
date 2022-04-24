from time import sleep
import pytest
import requests
from server import createApp
import pytest_check
from database.extensions import mongo

def main():

    url = "http://localhost:5000/users/"
    app = createApp()

    def test_add_user():
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
    
    test_add_user()
    test_fail_log_in()
    test_log_in()
    
    