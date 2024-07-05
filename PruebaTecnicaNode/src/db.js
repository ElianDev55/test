import pg from 'pg';

// Corrección del nombre de la variable de 'poll' a 'pool'
export const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: '', // Asegúrate de configurar una contraseña segura
    port: process.env.DB_PORT,
});
