class User:

    def __init__(self, first_name, last_name, email, hashed_password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email 
        self.hashed_password = hashed_password 
    
    def get_first_name(self):
        return self.first_name
    
    def get_last_name(self):
        return self.last_name
    
    def get_email(self):
        return self.email

