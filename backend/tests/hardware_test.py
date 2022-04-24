from time import sleep
import pytest
import requests
from server import createApp
import pytest_check
from database.extensions import mongo

def main():
    url = "http://localhost:5000/hardware/"
    app = createApp()
    collection = mongo.db["hardware"]

    def test_create_hardware():
        doc = {
            "HWSetName": "testhardware99",
            "total_quantity": 99,
            "price": 10
        }
        response = requests.post(url=url, data=doc)
        assert response.status_code == 201

    test_create_hardware()