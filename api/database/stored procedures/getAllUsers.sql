
--Get all the users. Ideally, this would be used by an admin.

CREATE PROCEDURE getAllUsers
AS
BEGIN
    SELECT [id], [username], [email], [phone_number] FROM [user] WHERE [deleted] = 0;
END;