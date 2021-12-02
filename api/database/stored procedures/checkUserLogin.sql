
--User login. A user can login using his email address and password only
CREATE PROCEDURE checkUserLogin
(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    --Get only the first row that matches. Since email is unique, at most one row will match anyway
    SELECT TOP 1 [id], [username], [password] FROM [user] WHERE [email] = @email;
END;