USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[deleteUser]    Script Date: 12/25/2021 1:53:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[deleteUser]
(@userId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [user] SET [deleted] = 1 WHERE [id] = @userId;
    SET @deleted = @@ROWCOUNT;
END;
GO

