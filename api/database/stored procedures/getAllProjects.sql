USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getAllProjects]    Script Date: 12/25/2021 1:53:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


--Get all the projects. Ideally, this would be used by an admin, for example when assigning projects to users
CREATE OR ALTER     PROCEDURE [dbo].[getAllProjects]
AS
BEGIN
    SELECT [id], [name], [description], [user_id], 
    COALESCE((SELECT TOP 1 [username] FROM [user] WHERE [id] = project.user_id), 'Not assigned') assigned,
	(SELECT COUNT(*) FROM task WHERE project_id = project.id AND deleted = 0 ) tasks
     FROM [project] WHERE [deleted] = 0  ORDER BY [id], [name], [description];
END;
GO

