USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[updateAdminInfo]    Script Date: 12/25/2021 1:59:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[updateAdminInfo]
(@adminId INTEGER, @newEmail VARCHAR(225) = NULL, @newUsername VARCHAR(50) = NULL, @newPassword VARCHAR(225) = NULL, 
@updated BIGINT OUTPUT)
AS
BEGIN

    SET @updated = 0;
    IF @newEmail IS NOT NULL
        BEGIN
            UPDATE [admin] SET [email] = @newEmail;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newUsername IS NOT NULL
        BEGIN
            UPDATE [admin] SET [username] = @newUsername;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newPassword IS NOT NULL
        BEGIN
            UPDATE [admin] SET [password] = @newPassword;
            SET @updated = @@ROWCOUNT;
        END;
END;
GO

