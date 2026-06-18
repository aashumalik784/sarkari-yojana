CREATE TABLE IF NOT EXISTS schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    link TEXT UNIQUE,
    description TEXT,
    category TEXT,
    ministry TEXT,
    eligibility TEXT,
    published_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_category ON schemes(category);
CREATE INDEX IF NOT EXISTS idx_published ON schemes(published_date);
