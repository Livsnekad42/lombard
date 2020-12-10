CREATE TABLE IF NOT EXISTS documents (
    Id SERIAL PRIMARY KEY,
    title VARCHAR(500),
    alias VARCHAR(500),
    url VARCHAR(500),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to localtez;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO localtez;
