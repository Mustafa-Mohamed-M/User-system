--Insert a task. A task must be associated with a project. By default the task is not completed
CREATE PROCEDURE insertTask
(@taskName VARCHAR(50), @description VARCHAR(225), @projectId INTEGER, @inserted BIT OUTPUT)
AS
BEGIN
    SET @inserted = 0;
    INSERT INTO [task] ([name], [description], [project_id]) VALUES(@taskName, @description, @projectId);
    SET @inserted = @@ROWCOUNT;
END;
