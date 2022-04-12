
class DataSet:
    
    def __init__(self,name, authors, description, download_link):
        self.name = name
        self.authors = authors
        self.descriptipn = description
        self.download_link = download_link 
    
    def get_name(self):
        return self.name
    
    def get_authors(self):
        return self.authors 
    
    def get_description(self):
        return self.description
    
    def get_download_link(self):
        return self.download_link
