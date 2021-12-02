CREATE TABLE [task] (
    id INTEGER PRIMARY KEY IDENTITY, --the unique id of the task, auto-incremented
    [name] VARCHAR(50) NOT NULL, --the name of the task
    [description] VARCHAR(225), --the description of the task
    [completed] BIT DEFAULT 0, --whether the task has been completed
    [deleted] BIT DEFAULT 0, --whether the project has been deleted
    [user_id] INTEGER DEFAULT NULL, --the user who has been assigned this task. The user must own the project
    [project_id] INTEGER NOT NULL, --the id of the project this task belongs to
    CONSTRAINT FK_task_user FOREIGN KEY ([user_id]) REFERENCES [user](id), --the relationship
    CONSTRAINT FK_task_project FOREIGN KEY ([project_id]) REFERENCES [project](id) ON UPDATE CASCADE ON DELETE CASCADE
);