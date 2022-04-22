"""
main.py
- main file to create/initialize the app and run the app.
"""

from backend.server import createApp # imports the createApp function from the server folder

app = createApp()

if __name__ == "__main__":
    app.run(debug=True)