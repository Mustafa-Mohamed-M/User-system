SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Get a specific task
CREATE PROCEDURE [dbo].[getTask]
(@taskId INTEGER)
AS
BEGIN
    SELECT [id], [name], [description], [completed], [project_id] FROM [task] WHERE [id] = @taskId AND [deleted] = 0;
END;
GO
