--Insert user. Email must be unique
CREATE PROCEDURE insertUser
(@username VARCHAR(50), @email VARCHAR(225), @password VARCHAR(225), @phone_number VARCHAR(15), @inserted INTEGER OUTPUT)
AS
    BEGIN
        INSERT INTO [user] (username, email, [password], [phone_number]) VALUES (
            @username, @email, @password, @phone_number
        );
        SET @inserted = @@ROWCOUNT;
    END;
