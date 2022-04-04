import bcrypt
from pymongo import MongoClient 

# TODO: Handle the case of multiple users having the same username

class EncryptionModule:
    """
    Encryption Module class that provides methods to hash and verify passwords as well as 
    store them in our database. 

    Attributes
    ----------
    client : MongoClient
        MongoDB client

    Methods
    -------
    HashPasswordWithSalt()
        Hashes a password given as input

    VerifyPassword()
        Verifies a password by hashing it and checking our password database
    
    """

    def __init__(self, mongodb_client):
        """
        Initializes local variable client which will have a reference to the MongoClient 
        """
        self.client = mongodb_client


    def gen_hashed_password_with_salt(self, user_password):
        """
        Generates a hashed password using a salt from a user password. Returns
        hashed password

        Parameters
        ----------
        user_password: string
            raw password as provided by the user when creating account
                
        Returns
        -------
        hashed password: string
            generated hashed password
        """
        
        # If password string is empty, return failed
        if not user_password:
            return (0, 0)

        # Password cannot be more than 72 characters since the bcrypt library
        # ignores characters after the 72nd
        if len(user_password) > 72:
            return (0, 0)
        
        # Generate a random salt for the password. This will be stored along 
        # with the hashed password in our database. 
        salt = bcrypt.gensalt()

        # Create hashed password from user_password and randomly created salt
        hashed_password = bcrypt.hashpw(user_password.encode('utf8'), salt)

        return hashed_password


    def store_hashed_password_and_username(self, hashed_password, username):
        """
        Stores a hashed password, and username into a MongoDB database

        Parameters
        ----------
        hashed_password: string
            password already encrypted previously by this module
        
        username: string
            username of client
        
        Returns
        -------
        status: boolean
        True if sucessful, False otherwise
        """

        # Form data dictionary
        user_info = {
            "username": username,
            "hashed_pass": hashed_password
        }

        try:
            # Obtaining database to which we'll interface
            users_db = self.client.users

            # Get reference to collection
            users_info = users_db.users_info

            # Insert user_info dictionary
            users_info.insert_one(user_info)

        except Exception as e:
            print("Error while accessing database:\n")
            print(e)
            return False

        return True 


    def verify_password(self, user_password, hashed_password):
        """
        Verifies the password matches the password of the given username

        Parameters
        ----------
        user_password: string
            raw password as inputted by the user in log in

        user_name: string
            user name of client

        Returns
        -------
        status: boolean
        True if password matches the password of the user, False otherwise.
        """        
        # TODO: Decide whether we want to access the database from encryption module. Currently, I have the database access in the user route.
        # try:
        #     # Obtain database to which we'll interface
        #     users_db = self.client.users

        #     # Get reference to collection 
        #     users_info = users_db.users_info
        
        # except Exception as e:
        #     print("Error while accesing database:\n")
        #     print(e)
        #     return False

        # try:
        #     # Obtain the hashed password from MongoDB using the username 
        #     # the provided user_name
        #     user_info = users_info.find_one({"username": username})

        #     # Get the hashed password from the user_info dictionary
        #     hashed_password = user_info['hashed_pass']
        
        # except Exception as e:
        #     print("Username does not exist:\n")
        #     print(e)
        #     return False

        # Verify if the user_password matches the hash_password of the user_name obtained
        # from our database
        return bcrypt.checkpw(user_password.encode('utf8'), hashed_password)


'''
THIS MAIN IS FOR TESTING PURPOSES:
COMMENT OUT ONCE THE MODULE IS READY TO BE USED BY OTHER MODULES
'''



# if __name__ == "__main__":
#     myEncryptMod = EncryptionModule(Client)
#     password = "TEST"

#     #hashed_pass = myEncryptMod.gen_hashed_password_with_salt(password)
#     #print("hashed pass: " + str(hashed_pass))
#     #myEncryptMod.store_hashed_password_and_username(hashed_pass, "Erick")

#     print(myEncryptMod.verify_password(password, "Erick"))
