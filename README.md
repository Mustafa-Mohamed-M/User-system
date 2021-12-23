# User-system
The user system project

## Installation
To install this project, it is recommended that the database be created first. Create the database (using a name of your liking) then run the queries in the api/database/tables and api/database/stored procedures folders.
Place a .env file in the api/projects and api/users folders. The .env file should contain the following values (at minimum)

DATABASE_HOST=[put your host here e.g. localhost]
DATABASE_NAME=[put the database name here e.g. usersystem]
DATABASE_USER=[put the database user here e.g. sa]
DATABASE_PASSWORD=[put the database password here]
SECRET_KEY=[put the secret key here. this key is used during password encryption]

## Creating an admin account
To create an admin account, execute the following query (after creating the database).

INSERT INTO [admin] ([username], [password], [email]) VALUES ('Mustafa', '$2b$10$lIwT7688eAt1zkCwSsmxf.HX2aMszf1uU047JcawT435feETuxBQO', 'mustafamohamed4014@gmail.com');

Feel free to change the username and the email values in the query above as you wish, but it is recommended to keep the password as above. 

## Starting the app
To start the app, run "npm start" from a terminal in the frontend/usersystem folder.

Now, to login as an admin, use the url localhost:3000/admin/login where localhost is where the app is running from and 3000 is the port that the app is running on.

For the login to actually work, the users service should be running. From a terminal, run "npx nodemon" in the api/users folder. 
In order to create projects and tasks and assign them to users, run "npx nodemon" from a terminal in the api/projects directory.

To login as a "normal" user, use the url localhost:3000/ where localhost and 3000 have the same meaning as described above.

Happy hacking
