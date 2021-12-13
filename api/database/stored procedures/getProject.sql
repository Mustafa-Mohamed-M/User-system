SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Get a specific project
CREATE PROCEDURE [dbo].[getProject]
(@projectId INTEGER)
AS
BEGIN
    SELECT [name], [description], [user_id] FROM [project] WHERE [deleted] = 0 AND [id] = @projectId;
END;
GO
