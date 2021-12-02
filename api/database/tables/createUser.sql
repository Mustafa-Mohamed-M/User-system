CREATE TABLE [user] (
    id INTEGER PRIMARY KEY IDENTITY, --the unique id of the user
    username VARCHAR(50) UNIQUE NOT NULL, --the username of the user
    [email] VARCHAR(225) NOT NULL UNIQUE, --the email of the user
    [password] VARCHAR(225) NOT NULL, --the password of the user
    [deleted] BIT DEFAULT 0, --whether the user has been deleted or not
    [phone_number] VARCHAR(15) --the phone number of the user
);