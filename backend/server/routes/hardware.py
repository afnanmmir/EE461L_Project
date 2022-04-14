from crypt import methods
from flask import Blueprint, request
from flask import jsonify
from flask_jwt_extended import create_access_token

import sys


from database.extensions import mongo
from util.JSONEncoder import JSONEncoder
from util.encryption_module import EncryptionModule

hardware = Blueprint('hardware', __name__)

encoder = JSONEncoder()

database = mongo.db
hw_collection = database['hardware'] # Accesses the user collection of the database

@hardware.route('/', methods=["POST"])
def create_hardware():
    """
    POST hardware/

    Allows a user to create a hardware set
    Message from the frontend should be of the following form

    {
        HWSetName: <string>,
        total_quantity: <int>
    }

    Parameters
    ----------
    None.

    Returns
    -------
    201: Hardware set successfully created
    422: Errors (Not unique hardware set)
    400: Errors (Not proper request sent)
    """
    # function be able to create a new hardware set and add to the database.
    # function should check to make sure the request sent has a json of proper format

    req = request.get_json()
    hw_name = req['HWSetName']
    hw = hw_collection.find_one({'HWSetName':hw_name})
    print(f"Hardware Set {hw}")
    if(hw_collection == None):
        doc = {
                "HWSetName": req["HWSetName"],
                "total_quantity": req["total_quantity"],
                "available": req["total_quantity"],
                "checked_out": 0
            }
        hw_collection.insert_one(doc)
        return {
            'message': "Hardware Set Created"
        }, 201
    else:
        if(hw):
            return {
                'message': "Hardware Set with this name already exists"
            }, 422
        else:
            doc = {
                "HWSetName": req["HWSetName"],
                "total_quantity": req["total_quantity"],
                "available": req["total_quantity"],
                "checked_out": 0
            }
            hw_collection.insert_one(doc)
            # print("This worked!")
            return {
                'message': "Hardware Set Created"
            }, 201

@hardware.route('/', methods=["GET"])
def get_all_hardware():
    """
    GET hardware/

    Returns a list of all the available hardware sets in the database

    Parameters
    ----------
    None.

    Returns
    -------
    201: all hardware sets in the database
    """
    # Function should return list of all hardware sets in the database
    # The function currently returns the names of the hardwware sets,
    # More data might be needed in the future
    
    hw_list = []

    for hw in hw_collection.find():

        hw_dict = {
            "HWSetName": hw['HWSetName'],
            "total_quantity": hw['total_quantity'],
            "available": hw['available'],
            "checked_out": hw['checked_out']
        }

        hw_list.append(hw_dict)

    return jsonify(hw_list), 201

