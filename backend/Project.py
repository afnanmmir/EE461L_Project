from tabnanny import check
from hardwareSet import HWSet
from User import User
class Project:

    def __init__(self, name, description, creator, total_funds, admin_users, hardware_sets):
        self.name = name
        self.description = description
        self.creator = creator 
        self.total_funds = total_funds
        self.current_funds = total_funds
        self.admin_users = admin_users
        self.hardware_sets = hardware_sets
    
    def get_name(self):
        return self.name
    
    def get_description(self):
        return self.description
    
    def get_creator(self):
        return self.creator
    
    def get_funds(self):
        return self.current_funds
    
    def total_funds(self):
        return self.total_funds

    def get_hardware_sets(self):
        return self.hardware_sets
    
    def check_in(self, hardware_set_id, quantity):
        
        # Find hardware set among list of project's hardware sets
        hw_set = None
        for hardware_set in self.hardware_sets:
            if hardware_set.id == hardware_set_id:
                hw_set = hardware_set 
                break
        
        # Return 0 if we didn't find the hardware set
        if hw_set is None:
            return 0
        
        # Check in quantity to this specific hardware set
        checked_in_qty = hw_set.check_in(quantity)

        # Increase current_funds
        self.current_funds += checked_in_qty * hw_set.cost_per_hardware

        # Verify we don't go over total_funds (which I think shouldn't happen)
        if self.current_funds > self.total_funds:
            self.current_funds = self.total_funds
        
        return checked_in_qty

    def check_out(self, hardware_set_id, quantity):
        
        # Find hardware set among list of project's hardware sets
        hw_set = None
        for hardware_set in self.hardware_sets:
            if hardware_set.id == hardware_set_id:
                hw_set = hardware_set 
                break

        # Return 0 if we didn't find the hardware set
        if hw_set is None:
            return 0
        
        # Check out quantity
        checked_out_qty = hw_set.check_out(quantity)
        
        # Decrease funds
        self.current_funds -= checked_out_qty * hw_set.cost_per_hardware

        # Verify we don't go under 0 (which I think shouldn't happen)
        if self.current_funds < 0:
            self.current_funds = 0
        
        return checked_out_qty
    
    def add_funds(self, amount):
        self.total_funds += amount 
        self.current_funds += amount
    
    def add_user(self, User):
        self.admin_users.append(User)


