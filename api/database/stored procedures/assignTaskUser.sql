SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[assignTaskUser]
(@taskId INTEGER, @userId INTEGER, @updated BIT OUTPUT)
AS
BEGIN
    SET @updated = 0;
    --Check that the user has been assigned project belonging to this task
    DECLARE @userProject INTEGER = -1;
    SELECT @userProject=[id] FROM project WHERE [user_id] = @userId;
    IF @userProject <> -1 
        BEGIN
            
            DECLARE @taskProject INTEGER = -1;
            SELECT @taskProject=[project_id] FROM [task] WHERE [id] = @taskId;
            IF @taskProject = @userProject --The user has been assigned the project
                BEGIN
                    UPDATE [task] SET [user_id] = @userId WHERE [id] = @taskId;
                    SET @updated = @@ROWCOUNT;
                END;
        END
END;
GO
