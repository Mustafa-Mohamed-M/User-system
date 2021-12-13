SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[assignProjectUser] 
(@projectId INTEGER, @userId INTEGER, @updated BIT OUTPUT)
AS
BEGIN
    SET @updated = 0;
    UPDATE [project] SET [user_id] = @userId;
    --If an error occurs, control will not reach this line
    SET @updated = @@ROWCOUNT;
END;
GO
