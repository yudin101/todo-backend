import Database from "better-sqlite3";

const db = new Database("tododb.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS todo_list (
    id INTEGER,
    todo TEXT NOT NULL,
    PRIMARY kEY ("id")
  );
`);

export default db;
