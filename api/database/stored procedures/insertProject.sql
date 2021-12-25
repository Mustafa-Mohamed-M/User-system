USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[insertProject]    Script Date: 12/25/2021 1:58:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[insertProject]
(@projectName VARCHAR(50), @description VARCHAR(255), @inserted BIT OUTPUT)
AS
BEGIN
    SET @inserted = 0;
    INSERT INTO [project] ([name], [description]) VALUES(@projectName, @description);
    SET @inserted = @@ROWCOUNT;
END;
GO

