import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    """
    JSONEncoder encodes a MongoDB document into JSON format to be used for the access token.
    """
    def default(self, o):
        """
        Creates a JSON compatible field for the inputted field

        Parameters
        ----------
        o : Object
            The object to be encoded into JSON
        ObjectID : Class
            A class that is a special case for encoding into JSON

        Returns
        -------
        Encoded version of the field.
        """
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
