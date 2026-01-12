-- ============================================
-- SCHEMA: SkillUp Database (SQLite)
-- ============================================

PRAGMA foreign_keys = ON;

-- =========================
-- USER
-- =========================
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK(role IN ('user','admin')) NOT NULL,
  photo TEXT,
  dateCreated TEXT DEFAULT (datetime('now')),
  region TEXT,
  gender TEXT CHECK(gender IN ('M','F')),
  birthDate TEXT
);

-- =========================
-- AREA
-- =========================
CREATE TABLE IF NOT EXISTS area (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

-- =========================
-- PEDAGOGICAL METHOD
-- =========================
CREATE TABLE IF NOT EXISTS pedagogicalMethod (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

-- =========================
-- MENTOR
-- =========================
CREATE TABLE IF NOT EXISTS mentor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile TEXT,
  id_user INTEGER NOT NULL,
  id_area INTEGER,
  id_pedagogicalMethod INTEGER,
  FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (id_area) REFERENCES area(id),
  FOREIGN KEY (id_pedagogicalMethod) REFERENCES pedagogicalMethod(id)
);

-- =========================
-- EXPERIENCE
-- =========================
CREATE TABLE IF NOT EXISTS experience (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company TEXT,
  position TEXT,
  description TEXT,
  dateStart TEXT NOT NULL,
  dateFinish TEXT,
  id_mentor INTEGER,
  FOREIGN KEY (id_mentor) REFERENCES mentor(id) ON DELETE CASCADE
);

-- =========================
-- APPRENTICE
-- =========================
CREATE TABLE IF NOT EXISTS apprentice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  degree TEXT,
  id_user INTEGER NOT NULL,
  FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);

-- =========================
-- LANGUAGES
-- =========================
CREATE TABLE IF NOT EXISTS language (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

-- =========================
-- SPEAKS (User - Language)
-- =========================
CREATE TABLE IF NOT EXISTS speak (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_Language INTEGER,
  id_user INTEGER,
  FOREIGN KEY (id_Language) REFERENCES language(id),
  FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);

-- =========================
-- CERTIFICATES
-- =========================
CREATE TABLE IF NOT EXISTS certificate (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT,
  url TEXT,
  dateUpload TEXT DEFAULT (datetime('now')),
  id_user INTEGER,
  FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);

-- =========================
-- COURSE
-- =========================
CREATE TABLE IF NOT EXISTS course (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  startDate TEXT,
  endDate TEXT,
  status TEXT CHECK(status IN ('active','completed','cancelled')),
  cost REAL,
  id_mentor INTEGER,
  FOREIGN KEY (id_mentor) REFERENCES mentor(id)
);

-- =========================
-- SESSION
-- =========================
CREATE TABLE IF NOT EXISTS session (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  startDate TEXT,
  mode TEXT CHECK(mode IN ('virtual','presencial')),
  duration INTEGER,
  status TEXT CHECK(status IN ('scheduled','in_progress','completed')),
  id_course INTEGER,
  FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE
);

-- =========================
-- RESOURCE
-- =========================
CREATE TABLE IF NOT EXISTS resource (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resource_url TEXT,
  description TEXT,
  id_course INTEGER,
  FOREIGN KEY (id_course) REFERENCES course(id) ON DELETE CASCADE
);

-- =========================
-- REGISTER
-- =========================
CREATE TABLE IF NOT EXISTS register (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dateRegistered TEXT DEFAULT (datetime('now')),
  id_apprentice INTEGER,
  FOREIGN KEY (id_apprentice) REFERENCES apprentice(id)
);

-- =========================
-- REGISTER DETAILS
-- =========================
CREATE TABLE IF NOT EXISTS registerDetail (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  finishCost REAL,
  discount REAL,
  id_course INTEGER,
  id_register INTEGER,
  FOREIGN KEY (id_course) REFERENCES course(id),
  FOREIGN KEY (id_register) REFERENCES register(id)
);

-- =========================
-- CHAT
-- =========================
CREATE TABLE IF NOT EXISTS chat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  id_sender INTEGER,
  id_receiver INTEGER,
  FOREIGN KEY (id_sender) REFERENCES user(id),
  FOREIGN KEY (id_receiver) REFERENCES user(id)
);

-- =========================
-- MESSAGE
-- =========================
CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  datePublished TEXT DEFAULT (datetime('now')),
  is_read INTEGER DEFAULT 0,
  id_chat INTEGER,
  id_user INTEGER,
  FOREIGN KEY (id_chat) REFERENCES chat(id) ON DELETE CASCADE,
  FOREIGN KEY(id_user) REFERENCES user(id) ON DELETE CASCADE
);

-- =========================
-- NOTIFICATION
-- =========================
CREATE TABLE IF NOT EXISTS notification (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  content TEXT,
  date TEXT DEFAULT (datetime('now')),
  url TEXT
);

-- =========================
-- NOTIFY (User - Notification)
-- =========================
CREATE TABLE IF NOT EXISTS notify (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_user INTEGER,
  id_notification INTEGER,
  FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (id_notification) REFERENCES notification(id)
);

-- =========================
-- RATING
-- =========================
CREATE TABLE IF NOT EXISTS rating (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  score INTEGER CHECK(score BETWEEN 1 AND 5),
  comment TEXT,
  date TEXT DEFAULT (datetime('now')),
  ratedBy TEXT,
  id_user INTEGER,
  FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);
