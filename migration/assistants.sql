DROP TABLE IF EXISTS assistants;

CREATE TABLE assistants (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	assistant_id TEXT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT (DATETIME('now', 'localtime')),
	updated_at DATETIME NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

INSERT INTO
	assistants (user_id, assistant_id)
VALUES
	(
		1,
		'asst_D5n9t3r7FEBC2pUREbeFYHJ4'
	),
	(
		1,
		'asst_vZ3omoOzq9t3OxJlxmXVyMqI'
	),
	(
		1,
		'asst_gSatq0Nw2o5Ji9vfuPyDdSHI'
	);
