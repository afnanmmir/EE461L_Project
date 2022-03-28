
class HWSet:
    Capacity = 0
    Availability = 0
    CheckedOut = 0

    def __init__(self, qty):
        self.Capacity = qty
        self.Availability = qty

    def get_availability(self):
        return self.Availability

    def get_capacity(self):
        return self.Capacity

    def get_checkedout_qty(self):
        return self.CheckedOut

    def check_out(self, qty):
        if(qty > self.Availability): # Return an error if the qty is too large
            self.CheckedOut += self.Availability
            self.Availability = 0
            return -1
        self.CheckedOut += qty
        self.Availability -= qty
        return 0

    def check_in(self, qty):
        self.Availability += qty
        if(self.Availability > self.Capacity):
            self.Availability = self.Capacity
    
