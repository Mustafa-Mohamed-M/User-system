SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserInfo]
(@userId INTEGER, @newEmail VARCHAR(225) = NULL, @newUsername VARCHAR(50) = NULL, @newPassword VARCHAR(225) = NULL, 
@newPhoneNumber VARCHAR(15),
@updated BIGINT OUTPUT)
AS
BEGIN

    SET @updated = 0;
    IF @newEmail IS NOT NULL
        BEGIN
            UPDATE [user] SET [email] = @newEmail  WHERE [id] = @userId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newUsername IS NOT NULL
        BEGIN
            UPDATE [user] SET [username] = @newUsername  WHERE [id] = @userId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newPassword IS NOT NULL
        BEGIN
            UPDATE [user] SET [password] = @newPassword  WHERE [id] = @userId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newPhoneNumber IS NOT NULL
        BEGIN
            UPDATE [user] SET [phone_number] = @newPhoneNumber WHERE [id] = @userId;
            SET @updated = @@ROWCOUNT;
        END;
END;
GO
