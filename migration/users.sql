DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	line_id TEXT UNIQUE NOT NULL,
	assistant_id TEXT,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);
