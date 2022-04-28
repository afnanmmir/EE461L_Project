import pytest
from backend.server import createApp
import pytest_check
from webapp import client

def test_create_new_hardware(client):
    '''
    Tests that when a new hardware set is sent to the 
    backend api, the hardware set is successfully registered
    in the database. 
    '''

def test_create_existent_hardware(client):
    '''
    Tests that when an attempt to register a hardware set
    with a name of an already existent hardware set in the databse
    occurs, we return the appropiate error response (422)
    '''


def test_get_all_hardware(client):
    '''
    Tests that get all hardware returns the expected hardwares
    sets from database.
    '''
