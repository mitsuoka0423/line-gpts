DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	line_id TEXT UNIQUE NOT NULL,
	assistant_id TEXT,
	created_at DATETIME NOT NULL DEFAULT (DATETIME('now', 'localtime')),
	updated_at DATETIME NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);
