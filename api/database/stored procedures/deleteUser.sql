SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[deleteUser]
(@userId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [user] SET [deleted] = 1 WHERE [id] = @userId;
    SET @deleted = @@ROWCOUNT;
END;
GO
