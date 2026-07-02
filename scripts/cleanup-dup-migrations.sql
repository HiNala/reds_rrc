DELETE FROM drizzle.__drizzle_migrations
WHERE id IN (SELECT id FROM drizzle.__drizzle_migrations ORDER BY id DESC LIMIT 2);
