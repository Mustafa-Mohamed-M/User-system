SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[insertTask]
(@taskName VARCHAR(50), @description VARCHAR(225), @projectId INTEGER, @inserted BIT OUTPUT)
AS
BEGIN
    SET @inserted = 0;
    INSERT INTO [task] ([name], [description], [project_id]) VALUES(@taskName, @description, @projectId);
    SET @inserted = @@ROWCOUNT;
END;
GO
