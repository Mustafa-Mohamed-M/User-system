USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getProjectTasks]    Script Date: 12/25/2021 1:55:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



--Get the tasks of a project.
CREATE OR ALTER     PROCEDURE [dbo].[getProjectTasks]
(@projectId INTEGER)
AS
BEGIN
    SELECT [id], [name], [description], [completed], [user_id], 
	(SELECT TOP 1 username FROM [user] WHERE [id] = task.user_id) assigned
	FROM [task] WHERE [deleted] = 0 AND [project_id] = @projectId;
END;
GO

