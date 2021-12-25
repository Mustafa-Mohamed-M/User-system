USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getAllUsers]    Script Date: 12/25/2021 1:54:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER   PROCEDURE [dbo].[getAllUsers]
AS
BEGIN
    SELECT [id], [username], [email], [phone_number], 
	COALESCE(
	(SELECT TOP 1 [id] FROM [project] WHERE [user_id] = [user].id ), -1
	) AS user_project_id,
	(
		SELECT TOP 1 [name] FROM [project] WHERE [user_id] = [user].id
	) AS user_project_name
	FROM [user] WHERE [deleted] = 0;
END;
GO

