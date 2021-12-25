USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getUserTasks]    Script Date: 12/25/2021 1:57:36 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[getUserTasks](
@userId INTEGER 
)
AS 
BEGIN
	SELECT [id], [name], [description], [completed], [project_id] FROM [task] WHERE [user_id] = @userId AND deleted = 0 
	ORDER BY [name], [id]
END;
GO

