USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getProjectTasksPaginated]    Script Date: 12/25/2021 1:55:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mustafa Mohamed
-- Create date: 23rd December
-- Description:	Gets the tasks of a project in a paginated manner. The 
-- tasks are ordered by ID
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getProjectTasksPaginated] 
	@projectId INTEGER, @PageNumber AS INT, @RowCount AS INT,
	@TotalTasks AS INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--Get the total number of tasks
	SELECT @TotalTasks = COUNT(*) FROM [task] WHERE [deleted] = 0 AND [project_id] = @projectId


    SELECT [id], [name], [description], [completed], [user_id], 
	(SELECT TOP 1 username FROM [user] WHERE [id] = task.user_id) assigned
	FROM [task] WHERE [deleted] = 0 AND [project_id] = @projectId
	ORDER BY [id] OFFSET (@PageNumber-1)*@RowCount ROWS FETCH NEXT @RowCount ROWS ONLY
END
GO

