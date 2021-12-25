USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[insertTask]    Script Date: 12/25/2021 1:59:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[insertTask]
(@taskName VARCHAR(50), @description VARCHAR(225), @projectId INTEGER, @inserted BIT OUTPUT)
AS
BEGIN
    SET @inserted = 0;
    INSERT INTO [task] ([name], [description], [project_id]) VALUES(@taskName, @description, @projectId);
    SET @inserted = @@ROWCOUNT;
END;
GO

