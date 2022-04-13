from crypt import methods
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

import sys


from database.extensions import mongo
from util.JSONEncoder import JSONEncoder
from util.encryption_module import EncryptionModule

hardware = Blueprint('hardware', __name__)

encoder = JSONEncoder()

database = mongo.db

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
    return

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
    return

