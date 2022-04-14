from crypt import methods
from flask import Blueprint, request
from flask_jwt_extended import create_access_token

import sys


from database.extensions import mongo
from util.JSONEncoder import JSONEncoder
from util.encryption_module import EncryptionModule

projects = Blueprint('projects', __name__)

encoder = JSONEncoder()

database = mongo.db
projects_collection = database["projects"]
user_collection = database['users']

# TODO: Check if maybe it's better to pass an email as 'creator' of project instead of firstname
@projects.route("/", methods=["POST"])
def create_project():
    """
    POST projects/

    Allows user to create a new project. Project will have attributes such as 
    an id, name, creator, members, funds, hardware sets...
    Format of Project:
    {
        name: <string>,
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
    # Function requirements:
    # Function should give a unique id for the project being created. Would be named 'userEmail_projectName'
    # Function should check to make sure project of given name has not already been created by the user

    # Format the input to json
    req = request.get_json()

    # Obtain the creator's user name (I'm assuming the first name is passed in here)
    creator = req['creator']
    
    # Get user email from user name in database
    user = user_collection.find_one({'first_name':creator})

    if (user == None):
        # No user was found in database, return error
        return {
        'message': "Error in creating the project, no user found"
        }, 422

    # Get email of user found in database to create project id
    user_email = user['email']

    # Get data we'll use to populate database
    project_name = req['name']
    description = req['description']
    funds = req['funds']
    users = req['users']
    hw_sets = req['HWSets']

    # Create id of project as userEmail_projectName
    project_id = user_email + '_' + project_name

    # Check if a project with the given name is already created, return error if so
    project = projects_collection.find_one({'project_name':project_name})
    if(project != None):
        # A project with the given name already exists
        return {
        'message': "Error in creating the project, project name already exists"
        }, 422

    # Create document's dictionary
    doc = {
        "id":project_id,
        "project_name": project_name,
        "description": description,
        "funds": funds,
        "users": users,
        "hw_sets":hw_sets
    }

    # Insert document into projects_collection
    projects_collection.insert_one(doc)
    
    # Return success message
    return {
        'message': "Newly created project"
    }, 201
    

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

    # We are assumingthat the id parameter of the project has format userEmail_projectName

    # Verify a project with such id exits

    # Get all current data of project
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
    # Function requirements:
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
    """
    DELETE projects/<id>

    Allows user to delete a project

    Parameters
    ----------
    id : String
    - the id of the project you want to delete

    Returns
    -------
    201: Project has been successfully deleted
    422: Error in deleting the project
    """

    # NOTE: We are assuming that the format of the id is userEmail_projectName

    project = projects_collection.find_one({"id":id})
    
    if project == None:
        return {
            'message': "Project did not exist already"
        }, 201

    projects_collection.delete_one({"id":id})

    return {
        'message': "Deleted project"
    }, 201