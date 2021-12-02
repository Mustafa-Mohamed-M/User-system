
CREATE TABLE [project] (
    id INTEGER PRIMARY KEY IDENTITY,
    [name] VARCHAR(50) NOT NULL, --the name of the project
    [description] VARCHAR(225), -- A short description of the project
    [deleted] BIT DEFAULT 0, --whether or not the project has been deleted
    [user_id] INTEGER DEFAULT NULL, --the user who has been assigned this project
    CONSTRAINT FK_project_user FOREIGN KEY ([user_id]) REFERENCES [user](id)
);