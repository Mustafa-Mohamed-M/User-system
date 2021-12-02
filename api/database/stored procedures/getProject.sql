--Get a specific project
CREATE PROCEDURE getProject
(@projectId INTEGER)
AS
BEGIN
    SELECT [name], [description], [user_id] FROM [project] WHERE [deleted] = 0 AND [id] = @projectId;
END;