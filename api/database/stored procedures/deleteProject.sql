USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[deleteProject]    Script Date: 12/25/2021 1:52:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[deleteProject]
(@projectId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [project] SET [deleted] = 1 WHERE [id] = @projectId;
    SET @deleted = @@ROWCOUNT;
END;
GO

