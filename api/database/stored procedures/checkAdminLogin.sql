SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[checkAdminLogin]
(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT TOP 1 [id], [username], [password] FROM [admin] WHERE [email] = @email;
END;
GO
