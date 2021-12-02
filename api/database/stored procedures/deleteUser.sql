--Delete user. The user is merely soft deleted.
CREATE PROCEDURE deleteUser
(@userId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [user] SET [deleted] = 1 WHERE [id] = @userId;
    SET @deleted = @@ROWCOUNT;
END;