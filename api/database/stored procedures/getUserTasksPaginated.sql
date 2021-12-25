USE [usersystem]
GO

/****** Object:  StoredProcedure [dbo].[getUserTasksPaginated]    Script Date: 12/25/2021 1:57:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mustafa Mohamed
-- Create date: 23rd December 2021
-- Description:	Returns the tasks of a particular user in a paginated manner.
-- The OrderBy* parameters are used to specify the order in which the rows are 
-- sorted. The first OrderBy* parameter with a value of 1 will be used in the ORDER BY 
-- clause.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getUserTasksPaginated] 
	@UserId AS INT, @PageNumber AS INT, @RowCount AS INT, 
	@OrderById AS BIT=1, @OrderByName AS BIT=0, @OrderByDescription AS BIT=0,
	@TotalTasks AS INT OUTPUT
AS
BEGIN
	
	SET NOCOUNT ON;

	SET @TotalTasks = 0; --initialize with 0 
	--Get the number of tasks that the user has been assigned. This will assist in determining the number of pages
	SELECT @TotalTasks = COUNT(*) FROM [task] WHERE [user_id] = @UserId AND deleted = 0;

	--Get the tasks using the appropriate order by clause
	IF @OrderById = 1 
	BEGIN
		SELECT [id], [name], [description], [completed], [project_id] FROM [task] WHERE [user_id] = @userId AND deleted = 0 
		ORDER BY [id] OFFSET (@PageNumber-1)*@RowCount ROWS FETCH NEXT @RowCount ROWS ONLY
	END

	ELSE IF @OrderByName = 1
	BEGIN
		SELECT [id], [name], [description], [completed], [project_id] FROM [task] WHERE [user_id] = @userId AND deleted = 0 
		ORDER BY [name] OFFSET (@PageNumber-1)*@RowCount ROWS FETCH NEXT @RowCount ROWS ONLY
	END
    
	ELSE IF @OrderByDescription = 1
	BEGIN
		SELECT [id], [name], [description], [completed], [project_id] FROM [task] WHERE [user_id] = @userId AND deleted = 0 
		ORDER BY [description] OFFSET (@PageNumber-1)*@RowCount ROWS FETCH NEXT @RowCount ROWS ONLY
	END

	--Order by id if all OrderBy* parameters are not equal to 1
	ELSE
	BEGIN
		SELECT [id], [name], [description], [completed], [project_id] FROM [task] WHERE [user_id] = @userId AND deleted = 0 
		ORDER BY [id] OFFSET (@PageNumber-1)*@RowCount ROWS FETCH NEXT @RowCount ROWS ONLY
	END
END
GO

