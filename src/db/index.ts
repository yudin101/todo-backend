import Database from "better-sqlite3";

const db = new Database("tododb.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    PRIMARY KEY(id)
);
  CREATE TABLE IF NOT EXISTS todo_list (
    id INTEGER,
    user_id INTEGER,
    todo TEXT NOT NULL,
    date_created NUMERIC NOT NULL DEFAULT CURRENT_DATE,
    deadline NUMERIC,
    is_completed INTEGER NOT NULL DEFAULT 0 CHECK (is_completed IN (0, 1)),
    PRIMARY KEY ("id"),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`);

export default db;
