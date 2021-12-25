USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[checkAdminLogin]    Script Date: 12/25/2021 1:52:20 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[checkAdminLogin]
(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT TOP 1 [id], [username], [password] FROM [admin] WHERE [email] = @email;
END;
GO

