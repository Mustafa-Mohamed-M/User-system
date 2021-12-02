CREATE TABLE [admin] (
    id INTEGER PRIMARY KEY IDENTITY, --the unique identifier of the admin
    username VARCHAR(50) UNIQUE NOT NULL, --the username of the admin. Used during login
    [password] VARCHAR(225) NOT NULL, --the password of the admin
    [deleted] BIT DEFAULT 0, --whether or not the admin has been deleted
    email VARCHAR(225) UNIQUE NOT NULL, --the email of the admin
);