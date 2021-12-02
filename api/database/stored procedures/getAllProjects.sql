--Get all the projects. Ideally, this would be used by an admin, for example when assigning projects to users
CREATE PROCEDURE getAllProjects
AS
BEGIN
    SELECT [id], [name], [description], [user_id] FROM [project] WHERE [deleted] = 0;
END;