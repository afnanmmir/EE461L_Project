from pydoc import doc
from time import sleep
import pytest
import requests
from server import createApp
import pytest_check
from database.extensions import mongo

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