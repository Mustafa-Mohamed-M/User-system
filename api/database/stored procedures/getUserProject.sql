USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getUserProject]    Script Date: 12/25/2021 1:56:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[getUserProject]
(@userId INT )
AS
BEGIN
    SELECT TOP 1 project.id, project.name, project.description FROM project WHERE [user_id] = @userId 
    AND deleted = 0 ;
END
GO

