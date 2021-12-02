--Delete task. The task is merely soft deleted.
CREATE PROCEDURE deleteTask
(@taskId INTEGER, @deleted BIT OUTPUT)
AS
BEGIN
    SET @deleted = 0;
    UPDATE [task] SET [deleted] = 1 WHERE [id] = @taskId;
    SET @deleted = @@ROWCOUNT;
END;