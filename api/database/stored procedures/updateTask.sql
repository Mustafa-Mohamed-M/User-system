SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateTask]
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
GO
