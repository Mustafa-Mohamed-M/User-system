SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[insertUser]
(@username VARCHAR(50), @email VARCHAR(225), @password VARCHAR(225), @phone_number VARCHAR(15), @inserted INTEGER OUTPUT)
AS

    BEGIN
        INSERT INTO [user] (username, email, [password], [phone_number]) VALUES (
            @username, @email, @password, @phone_number
        );
        SET @inserted = @@ROWCOUNT;
    END;
GO
