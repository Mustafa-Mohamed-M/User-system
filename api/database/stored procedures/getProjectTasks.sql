SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Get the tasks of a project.
CREATE PROCEDURE [dbo].[getProjectTasks]
(@projectId INTEGER)
AS
BEGIN
    SELECT [id], [name], [description], [completed] FROM [task] WHERE [deleted] = 0 AND [project_id] = @projectId;
END;
GO
