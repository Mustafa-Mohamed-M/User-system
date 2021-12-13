SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[task](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](225) NULL,
	[completed] [bit] NULL,
	[deleted] [bit] NULL,
	[user_id] [int] NULL,
	[project_id] [int] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[task] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[task] ADD  DEFAULT ((0)) FOR [completed]
GO
ALTER TABLE [dbo].[task] ADD  DEFAULT ((0)) FOR [deleted]
GO
ALTER TABLE [dbo].[task] ADD  DEFAULT (NULL) FOR [user_id]
GO
ALTER TABLE [dbo].[task]  WITH CHECK ADD  CONSTRAINT [FK_task_project] FOREIGN KEY([project_id])
REFERENCES [dbo].[project] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[task] CHECK CONSTRAINT [FK_task_project]
GO
ALTER TABLE [dbo].[task]  WITH CHECK ADD  CONSTRAINT [FK_task_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[task] CHECK CONSTRAINT [FK_task_user]
GO
