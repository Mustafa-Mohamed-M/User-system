--Assign a project to a user. The project can or cannot have a user assigned already.
--If the project already has a user, the old user is removed from the project, together with any tasks
--that had been assigned to the user.
CREATE PROCEDURE assignProjectUser 
(@projectId INTEGER, @userId INTEGER, @updated BIT OUTPUT)
AS
BEGIN
    SET @updated = 0;
    UPDATE [project] SET [user_id] = @userId;
    --If an error occurs, control will not reach this line
    SET @updated = @@ROWCOUNT;
END;