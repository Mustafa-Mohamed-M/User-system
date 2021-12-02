--Admin login. An admin can login using his email address and password only
CREATE PROCEDURE checkAdminLogin
(@email VARCHAR(255), @password VARCHAR(255))
AS
BEGIN
    SELECT TOP 1 [id], [username], [password] FROM [admin] WHERE [email] = @email;
END;

