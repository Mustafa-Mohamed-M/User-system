--Update task info. The updatable fields are the name, description and completed. Leaving 
--out a field will result in the column maintaining its current value.
CREATE PROCEDURE updateTask
(@taskId INTEGER, @newTaskName VARCHAR(50) = NULL, @newTaskDescription VARCHAR(225) = NULL, 
@completed BIT = NULL, @updated BIT OUTPUT)
AS
BEGIN
    IF @newTaskDescription IS NOT NULL 
        BEGIN
            UPDATE [task] SET [description] = @newTaskDescription WHERE [id] = @taskId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newTaskName IS NOT NULL
        BEGIN
            UPDATE [task] SET [name] = @newTaskName WHERE [id] = @taskId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @completed IS NOT NULL
        BEGIN
            UPDATE [task] SET [completed] = @completed WHERE [id] = @taskId;
            SET @updated = @@ROWCOUNT;
        END;
END;
