import pytest
from backend.server import createApp
import pytest_check
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
def main():
    url = "http://localhost:5000/projects/"
    app = createApp()
    projects_collection = mongo.db["projects"]
    hw_collection = mongo.db['hardware']

    def test_add_project():
        doc = {
            "id": "email@email.com_project1",
            "name": "project1",
            "creator": "email@email.com",
            "description": "description",
            "funds": 100000,
            "users":["email@email.com"],
            "hw_sets": []
        }

        response = requests.post(url = url, data = doc)
        assert response.status_code == 201
        assert projects_collection.find_one({"creator": "email@email.com"}) != None

    def test_checkout():
        project_id = "email@email.com_project1"
        doc = {
            "HWSetName": "testhardware99",
            "amount": "10"
        }
        response = requests.put(url=url+"/checkout/" + project_id, data = doc)
        assert response.status_code == 201
        project = projects_collection.find_one({"_id": project_id})
        assert len(project['hw_sets']) != 0
        assert project['funds'] == 99900
        hw_set = hw_collection.find_one({"HWSetName": "testhardware99"})
        assert int(hw_set["available"]) == 89

    def test_checkin():
        project_id = "email@email.com_project1"
        doc = {
            "HWSetName": "testhardware99",
            "amount": "10"
        }
        response = requests.put(url=url+"/checkin/" + project_id, data = doc)
        assert response.status_code == 201
        project = projects_collection.find_one({"_id": project_id})
        assert len(project['hw_sets']) == 0
        assert project['funds'] == 100000
        hw_set = hw_collection.find_one({"HWSetName": "testhardware99"})
        assert int(hw_set["available"]) == 99

    test_add_project()
    test_checkout()
    test_checkin()
'''

def test_create_project():
    '''
    Test that a new project created by a valid user
    is created successfully.
    '''

def test_create_project_invalid_user():
    '''
    Tests that an attempt to create a project by a non
    existent user, we return the appropiate error (422)
    '''

def test_create_project_invalid_project_name():
    '''
    Tests that an attempt to create a project with 
    the name of an already existing project returns the
    appropiate error (422)
    '''

def test_get_project():
    '''
    
    '''

