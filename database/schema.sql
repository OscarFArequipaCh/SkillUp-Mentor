-- ============================================
-- SCHEMA: SkillUp Database (SQLite)
-- ============================================

PRAGMA foreign_keys = ON;

-- USER
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK(role IN ('mentor', 'apprentice', 'admin')) NOT NULL,
  photo TEXT,
  dateCreated TEXT DEFAULT (datetime('now')),
  region TEXT
);

-- MENTOR
CREATE TABLE IF NOT EXISTS mentor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experience TEXT,
  schedules TEXT,
  languages TEXT,
  certificates TEXT,
  id_user INTEGER NOT NULL,
  id_area INTEGER,
  id_pedagogicalMethod INTEGER,
  FOREIGN KEY (id_user) REFERENCES user (id) ON DELETE CASCADE,
  FOREIGN KEY (id_area) REFERENCES area (id),
  FOREIGN KEY (id_pedagogicalMethod) REFERENCES pedagogicalMethod (id)
);

-- APPRENTICE
CREATE TABLE IF NOT EXISTS apprentice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  certificates TEXT,
  languages TEXT,
  degree TEXT,
  gender TEXT,
  discount REAL DEFAULT 0,
  id_user INTEGER NOT NULL,
  FOREIGN KEY (id_user) REFERENCES user (id) ON DELETE CASCADE
);

-- AREA
CREATE TABLE IF NOT EXISTS area (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

-- PEDAGOGICAL METHOD
CREATE TABLE IF NOT EXISTS pedagogicalMethod (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

-- COURSE
CREATE TABLE IF NOT EXISTS course (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  startDate TEXT,
  endDate TEXT,
  status TEXT CHECK(status IN ('active', 'completed', 'cancelled')),
  cost REAL,
  id_mentor INTEGER,
  id_apprentice INTEGER,
  FOREIGN KEY (id_mentor) REFERENCES mentor (id),
  FOREIGN KEY (id_apprentice) REFERENCES apprentice (id)
);

-- SESSION
CREATE TABLE IF NOT EXISTS session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  startDate TEXT,
  mode TEXT CHECK(mode IN ('virtual', 'presencial')),
  duration INTEGER,
  status TEXT CHECK(status IN ('scheduled', 'in_progress', 'completed')),
  id_course INTEGER,
  FOREIGN KEY (id_course) REFERENCES course (id) ON DELETE CASCADE
);

-- RESOURCE
CREATE TABLE IF NOT EXISTS resource (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_url TEXT,
  description TEXT,
  id_course INTEGER,
  FOREIGN KEY (id_course) REFERENCES course (id) ON DELETE CASCADE
);

-- CHAT
CREATE TABLE IF NOT EXISTS chat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_sender INTEGER NOT NULL,
  id_receiver INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (id_sender) REFERENCES user (id),
  FOREIGN KEY (id_receiver) REFERENCES user (id)
);

-- MESSAGE
CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_chat INTEGER NOT NULL,
  content TEXT NOT NULL,
  datePublished TEXT DEFAULT (datetime('now')),
  is_read INTEGER DEFAULT 0,
  FOREIGN KEY (id_chat) REFERENCES chat (id) ON DELETE CASCADE
);

-- RATING
CREATE TABLE IF NOT EXISTS rating (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  score INTEGER CHECK(score BETWEEN 1 AND 5),
  comment TEXT,
  date TEXT DEFAULT (datetime('now')),
  ratedBy INTEGER,
  ratedFor INTEGER,
  id_user INTEGER,
  FOREIGN KEY (id_user) REFERENCES user (id) ON DELETE CASCADE
);
