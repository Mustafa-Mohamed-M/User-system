--Delete project. The project is merely soft-deleted.
CREATE PROCEDURE deleteProject
(@projectId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [project] SET [deleted] = 1 WHERE [id] = @projectId;
    SET @deleted = @@ROWCOUNT;
END;