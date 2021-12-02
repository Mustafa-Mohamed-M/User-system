--Insert a project. The project is not assigned a user at this point.
CREATE PROCEDURE insertProject
(@projectName VARCHAR(50), @description VARCHAR(255), @inserted BIT OUTPUT)
AS
BEGIN
    SET @inserted = 0;
    INSERT INTO [project] ([name], [description]) VALUES(@projectName, @description);
    SET @inserted = @@ROWCOUNT;
END;