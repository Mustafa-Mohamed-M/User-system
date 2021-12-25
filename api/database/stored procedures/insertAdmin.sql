USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[insertAdmin]    Script Date: 12/25/2021 1:58:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[insertAdmin] 
(@username VARCHAR(50), @email VARCHAR(225), @password VARCHAR(225), @inserted INTEGER OUTPUT)
AS
BEGIN
SET NOCOUNT ON --Performs some optimizations
INSERT INTO [admin] (username, [password], email) VALUES (@username, @email, @password);
SET @inserted = @@ROWCOUNT;
END
GO

