
class HWSet:
    Capacity = 0
    Availability = 0
    CheckedOut = 0

    def __init__(self, id, qty, Cost_per_hardware):
        self.id = id
        self.Capacity = qty
        self.Availability = qty
        self.Cost_per_hardware = Cost_per_hardware

    def get_availability(self):
        return self.Availability

    def get_capacity(self):
        return self.Capacity

    def get_checkedout_qty(self):
        return self.CheckedOut

    def check_out(self, qty):
        if(qty > self.Availability): # Return the amount checked out
            
            actual_qty_checked_out = self.Availability
            self.CheckedOut += actual_qty_checked_out
            self.Availability = 0

            return actual_qty_checked_out

        self.CheckedOut += qty
        self.Availability -= qty
        return qty

    def check_in(self, qty):
        # Increase availability by qty
        self.Availability += qty

        if(self.Availability > self.Capacity):
            # Calculate the actual quantity we were able to checked in
            actual_qty_checked_in = qty - (self.Availability - self.Capacity)
            # Set availability to capacity
            self.Availability = self.Capacity
            # Return the actual checked in qty
            return actual_qty_checked_in
        else:
            return qty
    
