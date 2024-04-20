DROP TABLE IF EXISTS conversations;

CREATE TABLE conversations (
  id INTEGER PRIMARY KEY,
  my_message TEXT NOT NULL,
  bot_message TEXT NOT NULL
);
