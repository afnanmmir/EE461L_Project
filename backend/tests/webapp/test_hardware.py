import pytest
from backend.server import createApp
import pytest_check
from webapp import client, database

import json

import sys

def test_create_new_hardware(client, database):
    '''
    Tests that when a new hardware set is sent to the 
    backend api, the hardware set is successfully registered
    in the database. 
    '''
    create_url = "/hardware/"

    user_collection = database['hardware']
    user_collection.delete_one({'HWSetName':'HWSetTest001'})

    new_hwset = {
        "HWSetName":"HWSetTest001",
        "total_quantity":100,
        "price":10,
    }

    response = client.post(create_url, json=new_hwset)

    print(response.data, file=sys.stderr)
    assert response.status_code == 201
    assert response.data == b'{"message":"Hardware Set Created","success":true}\n'

def test_create_existent_hardware(client, database):
    '''
    Tests that when an attempt to register a hardware set
    with a name of an already existent hardware set in the databse
    occurs, we return the appropiate error response (422)
    '''
    create_url = "/hardware/"

    new_hwset = {
        "HWSetName":"HWSetTest000",
        "total_quantity":100,
        "price":10,
    }

    response = client.post(create_url, json=new_hwset)

    print(response.data, file=sys.stderr)
    assert response.status_code == 422
    assert response.data == b'{"message":"Hardware Set with this name already exists"}\n'

def test_get_all_hardware(client, database):
    '''
    Tests that get all hardware returns the expected hardwares
    sets from database.
    '''
    hw_url = "/hardware/"

    response = client.get(hw_url)

    assert response.status_code == 201

    data = json.loads(response.data)
    assert data.get('hardwares') is not None
        
