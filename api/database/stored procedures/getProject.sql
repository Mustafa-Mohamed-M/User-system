USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getProject]    Script Date: 12/25/2021 1:55:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--Get a specific project
CREATE OR ALTER PROCEDURE [dbo].[getProject]
(@projectId INTEGER)
AS
BEGIN
    SELECT [name], [description], [user_id] FROM [project] WHERE [deleted] = 0 AND [id] = @projectId;
END;
GO

