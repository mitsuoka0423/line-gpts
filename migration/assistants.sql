DROP TABLE IF EXISTS assistants;

CREATE TABLE assistants (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	assistant_id TEXT NOT NULL,
	user_id INTEGER NOT NULL,
	thread_id: TEXT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT (DATETIME('now', 'localtime')),
	updated_at DATETIME NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
