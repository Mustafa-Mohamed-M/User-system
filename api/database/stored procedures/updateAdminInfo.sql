--Update admin info. The updatable fields are the username, email and password. Leaving out 
--any field will result in its maintaining its current value.
CREATE PROCEDURE updateAdminInfo
(@adminId INTEGER, @newEmail VARCHAR(225) = NULL, @newUsername VARCHAR(50) = NULL, @newPassword VARCHAR(225) = NULL, 
@updated BIGINT OUTPUT)
AS
BEGIN

    SET @updated = 0;
    IF @newEmail IS NOT NULL
        BEGIN
            UPDATE [admin] SET [email] = @newEmail  WHERE [id] = @adminId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newUsername IS NOT NULL
        BEGIN
            UPDATE [admin] SET [username] = @newUsername  WHERE [id] = @adminId;
            SET @updated = @@ROWCOUNT;
        END;
    IF @newPassword IS NOT NULL
        BEGIN
            UPDATE [admin] SET [password] = @newPassword  WHERE [id] = @adminId;
            SET @updated = @@ROWCOUNT;
        END;
END;
