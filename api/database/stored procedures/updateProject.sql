
--Update project info. The updatable fields are the project name and the project description. 
--Leaving out a field will result in its maintaining its current value
CREATE PROCEDURE updateProject 
(@projectId INTEGER, @newProjectName VARCHAR(50) = NULL, @newProjectDescription VARCHAR(225) = NULL, @updated BIT OUTPUT)
AS
BEGIN
    SET @updated = 0;
    IF @newProjectDescription IS NOT NULL
        BEGIN
            UPDATE [project] SET [description] = @newProjectDescription WHERE [id] = @projectId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newProjectName IS NOT NULL
        BEGIN
            UPDATE [project] SET [name] = @newProjectName WHERE [id] = @projectId;
            SET @updated = @@ROWCOUNT;
        END;
END;