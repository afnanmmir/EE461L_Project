import bcrypt

class EncryptionModule:
    """
    Encryption Module class that provides methods to hash and verify passwords as well as 
    store them in our database. 

    Methods
    -------
    HashPasswordWithSalt()
        Hashes a password given as input

    VerifyPassword()
        Verifies a password by hashing it and checking our password database
    
    """

    def __init__(self):
        """
        TODO: Will possibly pass MongoDB credentials to init, hence the member variables
        will possibly those credentials to access the database. 
        """

    def gen_hashed_password_with_salt(self, user_password):
        """
        Generates a hashed password using a salt from a user password. Returns
        a tuple of the generated hashed password and the salt. 

        Parameters
        ----------
        user_password: string
            raw password as provided by the user when creating account
                
        Returns
        -------
        hashed password and salt: (string, string)
            tuple of hashed password and randomly generated salt. If operation
            failed, the return tuple is (0, 0)
        """
        
        # If password string is empty, return failed
        if not user_password:
            return (0, 0)

        # Password cannot be more than 72 characters since the bcrypt library
        # ignores characters after the 72th
        if len(user_password) > 72:
            return (0, 0)
        
        # Generate a random salt for the password. This will be stored along 
        # with the hashed password in our database. 
        salt = bcrypt.gensalt()

        # Create hashed password from user_password and randomly created salt
        hashed_password = bcrypt.hashpw(user_password.encode('utf8'), salt)

        return (hashed_password, salt)


    def verify_password(self, user_password, user_name):
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
        
        # TODO: Obtain the hashed password from MongoDB database using 
        # the provided user_name
        hashed_password = b'$2b$12$pZ6LDPosbVuNwFm5w4ugn.4pdfdUUVR6DvpnGGdYbo1Q0Wyu0HYAO'
        
        # Verify if the user_password matches the hash_password of the user_name obtained
        # from our database
        return bcrypt.checkpw(user_password.encode('utf8'), hashed_password)


if __name__ == "__main__":
    myEncryptMod = EncryptionModule()
    password = "TEST"

    print(myEncryptMod.gen_hashed_password_with_salt(password))
    print(myEncryptMod.verify_password(password, "Erick"))
