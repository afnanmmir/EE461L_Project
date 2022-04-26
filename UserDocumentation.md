# Welcome to our Hardware as a Service (HaaS) web app
## Link
https://ee461l-app.herokuapp.com/

## Features
For our webapp we allow a user to sign up for an account, and log in with that account. Using this account, a user can create their own projects with a certain amount of funds. Additionally, a user is able to join a project that was created by another user of the web app. When a user is a member of a project, they have the ability to check in and out hardware sets for the project. Furthermore, a user can create new hardware sets that all users of the web app can checkout with their projects

### Log-in/Sign Up
When a user first visits the website, they will be greeted by a home page which will ask a user to either log in or sign up. If they do not have an account they will sign up
#### Sign up
When a user signs up, they are prompted for their first name, last name, email, and a password. The website will not allow you to sign up without all fields being filled out, a valid email must be entered, and the confirm password must match the password field. Once the fields are filled properly, the request will be sent to the database, and the backend will check if this user already exists. If it does, it will return an error. If not, it will create the user, and will navigate the user back to the landing page to log in. The password is encrypted when stored in the database to increase security.
#### Log in
A user will attempt to log in with their email and their password. Given a matching email and password, a user will be sent to the project dashboard page. If a user with the inputted email doesn't exist or the password doesn't match the email, an error message will pop up.

### Create Project
When a user is logged in they are able to create their own projects by inputting a name to the project, a certain amount of funds for the project, and a description for the project. If the user hasn't made a project with the inputted name, the backend will create the project for the user with a project id that is formatted `userEmail_projectName`. This is the id other users will use to join the project if they want to.

### Join a project
A user can join a project created by another user by entering the project id, which is formatted in the template above. If the project exists, the user will be added. If it does not, an error message will pop up

### Checking In and Out Hardware
Once you are a member of a project, you are able to checkin and checkout hardware
#### Checkout
A user can checkout hardware for their project, but the checkout quantity is limited by the availability of the hardware set and the total price of the hardware sets the user is checking out. If a user attempts to checkout an amount more than the amount available, then the backend will limit the amount checked out to the amount available. The same behavior will be taken if the amount checked out is too expensive for the user. 
#### Checkin
A user can also checkin hardware for their projects. If a user attempts to checkin more resources than they have, an error message will pop up. Otherwise, the resources will be checked in and the project's funds will be updated.

### Creating Hardware
A user can also create new hardware sets that all users can check in and out for their projects. The user must enter the name of the harware set, the total quantity of the hardware set, and the price per unit for the hardware set. If the name of the hardware set already exists, then the backend will throw an error and will not allow the user to create the hardware set. Otherwise, the hardware set will be created.

### Datasets
When a user is logged in, they will have access to 5 datasets they they will be able to download from the website. The datasets table has the names, description, and download links for the datasets.