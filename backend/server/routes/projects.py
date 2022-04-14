from crypt import methods
from curses.ascii import NUL
from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from flask import jsonify

import sys

from regex import P


from database.extensions import mongo
from util.JSONEncoder import JSONEncoder
from util.encryption_module import EncryptionModule

projects = Blueprint("projects", __name__)

encoder = JSONEncoder()

database = mongo.db
projects_collection = database["projects"]
user_collection = database["users"]
hardware_collection = database["hardware"]

# TODO: Determine if the id of the projects is even needed since we can maybe just use their name
# TODO: Check if maybe it's better to pass an email as 'creator' of project instead of firstname
# TODO: In POST methods, verify the format of the inputted data is correct, right now we are just assuming
#       it will be correct. For instance, HWSets need to be a dictionary with key as the name of the set and
#       value is the amount
# TODO: Determine what we'll use as 'user' in several places, is it firstname, lastname? combination? the email?


@projects.route("/", methods=["POST"])
def create_project():
    """
    POST projects/

    Allows user to create a new project. Project will have attributes such as 
    an id, name, creator, members, funds, hardware sets...
    
    Format of Project:
    {
        id: <string>
        name: <string>,
        creator: <string>,
        description: <string>,
        funds: <int>,
        users: <list>,
        HWSets: <dictionary> 
                key: HWSet
                value: Amount
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
    creator = req["creator"]

    # Get user email from user name in database
    user = user_collection.find_one({"first_name": creator})

    if user == None:
        # No user was found in database, return error
        return {"message": "Error in creating the project, no user found"}, 422

    # Get email of user found in database to create project id
    user_email = user["email"]

    # Get data we'll use to populate database
    project_name = req["name"]
    description = req["description"]
    funds = req["funds"]
    users = req["users"]
    hw_sets = req["HWSets"]

    # Create id of project as userEmail_projectName
    project_id = user_email + "_" + project_name

    # Check if a project with the given name is already created, return error if so
    project = projects_collection.find_one({"project_name": project_name})
    if project != None:
        # A project with the given name already exists
        return (
            {"message": "Error in creating the project, project name already exists"},
            422,
        )

    # Create document's dictionary
    doc = {
        "id": project_id,
        "project_name": project_name,
        "description": description,
        "funds": funds,
        "users": users,
        "hw_sets": hw_sets,
    }

    # Insert document into projects_collection
    projects_collection.insert_one(doc)

    # Return success message
    return {"message": "Newly created project"}, 201


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
    422: No user found for the email provided
    """
    # Function requirements:
    # Should only return projects of the current user.
    # The get request should contain a json with the email of the current user ({'user': userEmail})

    # Format the input to json
    req = request.get_json()

    # Gets the user's email from json input
    userEmail = req["user"]

    # Gets the user's name from their email
    user = user_collection.find_one({"email": userEmail})
    if user == None:
        # No user was found in database, return error
        return {"message": "Error, no user found"}, 422
    # print(user, file=sys.stderr)
    userName = user["first_name"]

    # Creates list of all projects with the user's name in the users field
    project_list = []

    for p in projects_collection.find():
        userArray = p["users"]
        if userName in userArray or userName.lower() in userArray:
            p_temp = p.copy()
            del p_temp["_id"]
            print(project_list, file=sys.stderr)
            project_list.append(p_temp)

    return jsonify(project_list), 200


@projects.route("/checkout/<id>", methods=["PUT"])
def project_checkout(id):
    """
    PUT projects/<id>

    Allows user to update a project by checking out resources. Request will look like this in
    JSON Format:
    {
        'HWSetName': <name>,
        'amount': <amount>
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

    # NOTE: We are assumingthat the id parameter of the project has format userEmail_projectName

    # Format the input to json
    req = request.get_json()
    hw_set_name = req["HWSetName"]
    amount = req["amount"]

    # Verify a project with such id exits
    project = projects_collection.find_one({"id": id})

    if project == None:
        return {"message": "Project not found"}, 404

    hw_sets = project["hw_sets"]

    # Modify hw_sets dictionary based on given data
    checked_out = amount

    for hw_set_key in hw_sets:
        if hw_set_key == hw_set_name:
            # Calculte the new amount of items available of this hw set
            new_amount = hw_sets[hw_set_name] - amount

            if new_amount < 0:
                # If the new amount is less than 0, we tried to withdraw more than available
                # so we only withdraw whatever is left
                new_amount = 0
                checked_out = hw_sets[hw_set_name]

            # Set the new amount in the dictionary for this hw set
            hw_sets[hw_set_name] = new_amount

    # Update the hardware collection database
    hw_set = hardware_collection.find_one({"HWSetName": hw_set_name})

    # Check this hardware set exists in the hardware database, it must exist
    if hw_set == None:
        return {"message": "Hardware Set Not Found in Database"}, 404

    currently_available = hw_set["available"]
    currently_checked_out = hw_set["checked_out"]

    # Update the hardware collection database using the hw set name as filter. Update the available amount and the checked_out amount
    hardware_collection.update_one(
        {"HWSetName": hw_set_name},
        {"$set": {"available": currently_available - checked_out}},
    )
    hardware_collection.update_one(
        {"HWSetName": hw_set_name},
        {"$set": {"checked_out": currently_checked_out + checked_out}},
    )

    # Update this specific project using its id as the filter setting the new hw_sets dictionary with the new available amount
    projects_collection.update_one({"id": id}, {"$set": {"HWSets": hw_sets}})

    # Return success message
    return {"message": "Project has been successfully updated"}, 201


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
        'user_email': <string>
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
    # Function should check for valid message.
    # Function should check that user you are trying to add exists in the database.

    # Format the input to json
    req = request.get_json()

    # Verify the input is valid
    add_or_remove = req["add_or_remove"]
    user_email = req["user_email"]

    if not (add_or_remove == "add" or add_or_remove == "remove"):
        return {"message": "Error in updating the project. Invalid Input"}, 422

    if add_or_remove == "add":
        # We are adding a user, verify the user exist in the database
        user = user_collection.find_one({"email": user_email})

        if user == None:
            # No user was found in database, return error
            return {"message": "Error in updating the project, no user found"}, 422

        # Proceed to add the user, get its name first
        first_name = user["first_name"]

        # Get list of users from project
        project = projects_collection.find_one({"id": id})

    else:
        # We are removing a user
        return

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

    project = projects_collection.find_one({"id": id})

    if project == None:
        return {"message": "Project did not exist already"}, 201

    projects_collection.delete_one({"id": id})

    return {"message": "Deleted project"}, 201

