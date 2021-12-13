SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[deleteTask]
(@taskId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [task] SET [deleted] = 1 WHERE [id] = @taskId;
    SET @deleted = @@ROWCOUNT;
END;
GO
