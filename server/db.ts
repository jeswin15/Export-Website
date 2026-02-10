import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not set. Database features will be disabled.");
}

export const pool = process.env.DATABASE_URL ? new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}) : null;
export const db = pool ? drizzle(pool, { schema }) : null;
