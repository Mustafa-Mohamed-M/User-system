
--Get a specific task
CREATE PROCEDURE getTask
(@taskId INTEGER)
AS
BEGIN
    SELECT [id], [name], [description], [completed], [project_id] FROM [task] WHERE [id] = @taskId AND [deleted] = 0;
END;