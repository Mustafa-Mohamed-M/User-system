--INSERT ADMIN. Email must be unique
CREATE PROCEDURE insertAdmin 
(@username VARCHAR(50), @email VARCHAR(225), @password VARCHAR(225), @inserted INTEGER OUTPUT)
AS
    BEGIN
        SET NOCOUNT ON --Performs some optimizations
        INSERT INTO [admin] (username, [password], email) VALUES (@username, @email, @password);
        SET @inserted = @@ROWCOUNT; --return the number of affected rows
    END
