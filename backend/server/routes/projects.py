from crypt import methods
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

import sys


from database.extensions import mongo
from util.JSONEncoder import JSONEncoder
from util.encryption_module import EncryptionModule

projects = Blueprint('projects', __name__)

encoder = JSONEncoder()

# Get database instance of the pymongo client
database = mongo.db 
# Accesses the projects collection of the database
projects_collection = database('projects')
# Accesses the user collection of the database
user_collection = database('users')

@projects.route("/", methods=["POST"])
def create_project():
    """
    POST projects/

    Allows user to create a new project. Project will have attributes such as 
    an id, creator, members, funds, hardware sets...
    Format of Project:
    {
        id: <string>,
        creator: <string>,
        description: <string>,
        funds: <int>,
        users: <list>,
        HWSets: <list>
    }

    Parameters
    ----------
    None.

    Returns
    -------
    201: Newly created project
    422: Error in creating the project

    """
    req = request.get_json()
    
    project_name = req['name']
    user_creator = req['creator']
    description = req['description']
    funds = req['funds']
    users = req['users']
    hw_sets = req['HWSets']

    # Get user's email
    user = user_collection.find_one({'user':user_creator})
    # Function should give a unique id for the project being created. Would be named 'userEmail_projectName'
    print(user['email'])
    # Function should check to make sure project of given name has not already been created by the user
    
    return

@projects.route("/", methods=["GET"])
def get_projects():
    """
    GET projects/

    Returns all the projects in the database FROM THE USER

    Parameters
    ----------
    None.

    Returns
    -------
    200: All the projects
    
    """
    # Should only return projects of the current user.
    # The get request should contain a json with the email of the current user ({'user': userEmail})
    return

@projects.route("/checkout/<id>", methods=["PUT"])
def project_checkout(id):
    """
    PUT projects/<id>

    Allows user to update a project by checking out resources. Request will look like this in
    JSON Format:
    {
        'HWSetName': <name>,
        'Amount': <amount>
    }

    Parameters
    ----------
    id : string
    - the id of the project you want to update

    Returns
    -------
    201: Project has been successfully updated
    404: Project not found
    422: Error in updating the project
    
    """
    return

@projects.route("/checkin/<id>", methods=["PUT"])
def project_checkin(id):
    """
    PUT projects/<id>

    Allows user to update a project by checking in resources. Request will look like this in
    JSON Format:
    {
        'HWSetName': <name>,
        'Amount': <amount>
    }

    Parameters
    ----------
    id : String
    - the id of the project you want to update

    Returns
    -------
    201: Project has been successfully updated
    404: Project not found
    422: Error in updating the project
    
    """
    # Function should check to make sure the project has resources to check in from the specified hardware set
    # Function should check to make sure project has checked in a valied amount of resources.
    return

@projects.route("/members/<id>", methods=["PUT"])
def project_update_members(id):
    """
    PUT projects/<id>

    Allows user to update a project by adding or removing members. Request will look like this in
    JSON Format:
    {
        'add_or_remove': <string>,
        'user': <user>
    }

    Parameters
    ----------
    id : String
    - the id of the project you want to update

    Returns
    -------
    201: Project has been successfully updated
    404: Project not found
    422: Error in updating the project
    
    """
    # Function should check for valid message.
    # Function should check that user you are trying to add exists in the database.
    return

@projects.route("/<id>", methods=["DELETE"])
def delete_project(id):
    return