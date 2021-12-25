USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[assignProjectUser]    Script Date: 12/25/2021 1:51:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE OR ALTER     PROCEDURE [dbo].[assignProjectUser] 
(@projectId INTEGER, @userId INTEGER, @updated INT OUTPUT)
AS
BEGIN
    SET @updated = 0;
    UPDATE [project] SET [user_id] = @userId WHERE [id] = @projectId;
    --If an error occurs, control will not reach this line
    SET @updated = @@ROWCOUNT;
END;
GO

