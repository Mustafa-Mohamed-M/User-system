SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[project](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[description] [varchar](225) NULL,
	[deleted] [bit] NULL,
	[user_id] [int] NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[project] ADD PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[project] ADD  DEFAULT ((0)) FOR [deleted]
GO
ALTER TABLE [dbo].[project] ADD  DEFAULT (NULL) FOR [user_id]
GO
ALTER TABLE [dbo].[project]  WITH CHECK ADD  CONSTRAINT [FK_project_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[project] CHECK CONSTRAINT [FK_project_user]
GO
