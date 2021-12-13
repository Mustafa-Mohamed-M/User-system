SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllUsers]
AS
BEGIN
    SELECT [id], [username], [email], [phone_number] FROM [user] WHERE [deleted] = 0;
END;
GO
