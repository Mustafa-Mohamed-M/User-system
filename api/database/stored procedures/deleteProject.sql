SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[deleteProject]
(@projectId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [project] SET [deleted] = 1 WHERE [id] = @projectId;
    SET @deleted = @@ROWCOUNT;
END;
GO
