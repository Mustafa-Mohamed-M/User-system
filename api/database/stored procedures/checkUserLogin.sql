USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[checkUserLogin]    Script Date: 12/25/2021 1:52:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[checkUserLogin]
(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT TOP 1 [id], [username], [password] FROM [user] WHERE [email] = @email;
END;
GO

