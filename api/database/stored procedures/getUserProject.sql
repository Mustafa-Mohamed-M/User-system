SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getUserProject]
(@userId INT )
AS
BEGIN
    SELECT TOP 1 project.id, project.name, project.description FROM project WHERE [user_id] = @userId 
    AND deleted = 0 ;
END
GO
