"""
Test file
"""

from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
import json
import sys

sys.path.append('..')

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return "Hello, world"


@main.route('/protected')
@jwt_required()
def protected():
    """
    This is the template used for when an authentication is needed. This is what would be needed for when we create the project 
    blueprint
    """
    current_user = get_jwt_identity()
    return current_user