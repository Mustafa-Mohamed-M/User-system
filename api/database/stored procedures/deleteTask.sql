USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[deleteTask]    Script Date: 12/25/2021 1:53:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[deleteTask]
(@taskId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [task] SET [deleted] = 1 WHERE [id] = @taskId;
    SET @deleted = @@ROWCOUNT;
END;
GO

