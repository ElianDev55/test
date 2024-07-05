import { pool } from '../db.js';



export const GetGame = async (req, res) => {
    try {
        // Primera consulta para obtener todos los videojuegos
        const { rows: games } = await pool.query('SELECT * FROM videogames');

        // Iterar sobre cada juego para obtener detalles de developer y platform
        const gamesWithDetails = await Promise.all(games.map(async (game) => {
            // Consulta para obtener el developer
            const { rows: [developer] } = await pool.query('SELECT id, name, country, website FROM developers WHERE id = $1', [game.developerid]);

            // Consulta para obtener la platform
            const { rows: [platform] } = await pool.query('SELECT id, name, manufacturer FROM platforms WHERE id = $1', [game.platformid]);

            // Anidar los resultados en el objeto del juego
            return {
                ...game,
                developer: developer ? { id: developer.id, name: developer.name, country: developer.country, website: developer.website } : null,
                platform: platform ? { id: platform.id, name: platform.name, manufacturer: platform.manufacturer } : null,
            };
        }));

        res.json(gamesWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

export const GetGameById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { rows: gameRows } = await pool.query('SELECT * FROM videogames WHERE id = $1', [id]);
        if (gameRows.length > 0) {
            const game = gameRows[0];
            // Consulta para obtener detalles del desarrollador
            const { rows: developerRows } = await pool.query('SELECT * FROM developers WHERE id = $1', [game.developerid]);
            // Consulta para obtener detalles de la plataforma
            const { rows: platformRows } = await pool.query('SELECT * FROM platforms WHERE id = $1', [game.platformid]);
            
            // Añadir detalles al objeto del juego
            const detailedGame = {
                ...game,
                developer: developerRows.length > 0 ? developerRows[0] : null,
                platform: platformRows.length > 0 ? platformRows[0] : null
            };
            
            res.json(detailedGame);
        } else {
            res.status(404).json({ message: 'Video not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'An error occurred' });
    }
};


export const CreateGame = async (req, res) => {
    const  {title, genre, platformid ,releasedate, developerid} = req.body;
    const query = await pool.query('INSERT INTO videogames (title, genre, platformid, releasedate, developerid) VALUES ($1, $2, $3, $4, $5)', [title, genre, platformid, releasedate, developerid]);
    res.json(
        { message: 'Video created', 
            body: {title, genre, platformid, releasedate, developerid } 
        }
    );
};

export const PatchGame = async (req, res) => {
    const { id } = req.params;
    const { title, genre, platformid ,relasedate, developerid } = req.body;
    
    try {
        const { rows } = await pool.query('SELECT * FROM videogames WHERE id = $1', [id]);
        if (rows.length > 0) {
            let updateQuery = 'UPDATE videogames SET';
            let updateParams = [];
            let paramIndex = 1;

            if (title) {
                updateQuery += ` title = $${paramIndex},`;
                updateParams.push(title );
                paramIndex++;
            }

            if (genre) {
                updateQuery += ` country = $${paramIndex},`;
                updateParams.push(genre);
                paramIndex++;
            }

            if (relasedate) {
                updateQuery += ` relasedate = $${paramIndex},`;
                updateParams.push(relasedate);
                paramIndex++;
            }

            
            if (developerid) {
                updateQuery += ` developerid = $${paramIndex},`;
                updateParams.push(developerid);
                paramIndex++;
            }


            updateQuery = updateQuery.slice(0, -1); // Remove the trailing comma
            updateQuery += ` WHERE id = $${paramIndex}`;
            updateParams.push(id);

            await pool.query(updateQuery, updateParams);
            res.json({ message: 'Videogmae updated', id });
        } else {
            res.status(404).json({ message: 'Videogame not found' });
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const DeleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM videogames WHERE id = $1', [id]);
        if (rows.length > 0) {
            await pool.query('DELETE FROM videogames WHERE id = $1', [id]);
            res.json({ message: 'Videogames deleted' , id });
        } else {
            res.status(404).json({ message: 'Videogames not found' });
        }
    } catch (error) {
        console.error(error.message);
    }
};