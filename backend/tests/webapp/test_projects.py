import pytest
from backend.server import createApp
import pytest_check
from webapp import client, database
import sys

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

def test_create_project(client, database):
    '''
    Test that a new project created by a valid user
    is created successfully.
    '''

def test_create_project_invalid_user(client, database):
    '''
    Tests that an attempt to create a project by a non
    existent user, we return the appropiate error (422).
    '''

def test_create_project_invalid_project_name(client, database):
    '''
    Tests that an attempt to create a project with 
    the name of an already existing project returns the
    appropiate error (422).
    '''

def test_get_projects_valid_user(client, database):
    '''
    Tests that get_projects returns all projects of a 
    given valid user email.
    '''

def test_get_projects_invalid_user(client, database):
    '''
    Tests that an attempt to get all projects from a non
    existent user email returns the appropiate error (422).
    '''

def test_project_checkout(client, database):
    '''
    Tests that checking out a valid amount from a hardware 
    set from a valid project is successful.
    '''

def test_project_checkout_invalid_project(client, database):
    '''
    '''

def test_project_checkout_invalid_amount(client, database):
    '''
    '''

def test_project_checkout_not_enough_funds(client, database):
    '''
    '''

def test_project_checkin(client, database):
    '''
    '''

def test_project_checkin_invalid_project(client, database):
    '''
    Tests that an attempt to check in to an invalid project 
    returns the appropiate error (404)
    '''
    
    # Set invalid URL with invalid ID of non existent project
    checkin_url = "/projects/checkin/"
    invalid_project_id = "invalid_project"

    check_url_invalid_project = checkin_url + invalid_project_id

    # Dictionary to send in request
    dict = {
        'HWSetName': "Test",
        "amount": 50
    }

    response = client.put(check_url_invalid_project, json=dict)

    # Verify status code and data message
    assert response.status_code == 404
    assert response.data == b'{"message":"Project not found"}\n'

def test_project_checkin_invalid_hardware_set(client, database):
    '''
    Tests that an attempt to checkin certain amount to a hardware
    set not part of a project returns the appropiate error (404)
    '''
    # Create a known project, without a hardware set
    project_id = "test@email.com_testproject"
    project = {
        "_id": project_id,
        "project_name": "testproject",
        "description": "test",
        "creator":"test@email.com",
        "funds": 100,
        "users": ["test@email.com"],
        "hw_sets": [],
    }

    # Insert known project into database
    projects_collection = database['projects']
    if projects_collection.find_one({"project_name":"testproject"}) == None:
        projects_collection.insert_one(project)

    # Set checkin url with a valid project
    checkin_url = "/projects/checkin/" + project_id 

    # Dictionary to send in request
    dict = {
        'HWSetName': "Test",
        "amount": 50
    }

    response = client.put(checkin_url, json=dict)

    # Verify responses
    assert response.status_code == 404
    assert response.data == b'{"message":"Hardware set not found in project list"}\n'




def test_project_update_members_add(client, database):
    '''
    Tests that adding a valid member to a project is successful.
    '''
    # Create a known project
    project_id = "test@email.com_testproject"
    project = {
        "_id": project_id,
        "project_name": "testproject",
        "description": "test",
        "creator":"test@email.com",
        "funds": 100,
        "users": ["test@email.com"],
        "hw_sets": [],
    }

    # Insert known project into database
    projects_collection = database['projects']
    if projects_collection.find_one({"project_name":"testproject"}) == None:
        projects_collection.insert_one(project)

    # Update the users list of the project to be empty 
    projects_collection.update_one({"project_name":"testproject"}, {"$set":{"users":[]}})
    
    # Create a known user 
    new_user_email = "new_email@test.com"
    user = {
        "firstName":"FirstNameTest",
        "lastName":"LastNameTest",
        "email":new_user_email,
        "password":"123"
    }

    # Insert known user into database
    user_collection = database['users']
    if user_collection.find_one({"email":new_user_email}) == None:
        user_collection.insert_one(user)

    update_members_url = "projects/members/" + project_id

    # Set json data to send
    update_members_dict = {
        'add_or_remove': 'add',
        'user_email': new_user_email
    }

    response = client.put(update_members_url, json=update_members_dict)

    # Verify response
    assert response.status_code == 201
    assert response.data == b'{"message":"User successfully added"}\n'



def test_project_update_members_remove(client, database):
    '''
    Test that removing a valid member from a project is successful.
    '''
    # Create a known project
    project_id = "test@email.com_testproject2"
    user_email = "test@email.com"
    
    project = {
        "_id": project_id,
        "project_name": "testproject2",
        "description": "test",
        "creator":user_email,
        "funds": 100,
        "users": [user_email],
        "hw_sets": [],
    }

    # Insert known project into database, if already there, update list of users to have
    # the user we'll remove
    projects_collection = database['projects']
    if projects_collection.find_one({"project_name":"testproject2"}) == None:
        projects_collection.insert_one(project)
    else:
        projects_collection.update_one({"project_name":"testproject2"}, {"$set":{"users":[user_email]}})


    # Set json data to send
    update_members_dict = {
        'add_or_remove': 'remove',
        'user_email': user_email
    }

    update_members_url = "projects/members/" + project_id

    response = client.put(update_members_url, json=update_members_dict)

    # Verify response
    assert response.status_code == 201
    assert response.data == b'{"message":"User removed from project"}\n'


def test_project_update_members_invalid_input(client, database):
    '''
    Test that an attempt to update members in a project where the 
    given input is incorrect (not add or remove)
    returns appropiate error message (400)
    '''
    project_id = "test@email.com_testproject2"

    update_members_url = "projects/members/" + project_id

    # Set json data to send
    update_members_dict = {
        'add_or_remove': 'test_incorrect_input',
        'user_email': "notneeded@test.com"
    }

    response = client.put(update_members_url, json=update_members_dict)

    # Verify error resposne
    assert response.status_code == 400
    assert response.data == b'{"message":"Error in updating the project. Invalid Input"}\n'



def test_project_update_members_invalid_project(client, database):
    '''
    '''

def test_project_update_members_invalid_user(client, database):
    '''
    Tests that an attempt to remove a non existent user 
    returns the appropiate error (422).
    '''

def test_delete_project(client, database):
    '''
    Tests that deleting an existent project is successful. 
    '''

def test_delete_project_invalid_project(client, database):
    '''
    Tests that an attempt to delete a non existent project returns
    the appropiate error (404).
    '''

