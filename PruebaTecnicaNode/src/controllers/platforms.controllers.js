import { pool } from '../db.js';

export const GetPlatforms = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM platforms')
    res.json(rows);
};

export const GetPlatformById = async (req, res) => {
    const { id } = req.params;
    
    try {
    const { rows } = await pool.query('SELECT * FROM platforms WHERE id = $1', [id]);
    console.log(rows);
    if (rows.length > 0) {
        res.json(rows);
    } else {
        res.status(404).json({ message: 'Platform not found' }); 
    }
    } catch (error) {
        console.error(error.message);
    }
};


export const CreatePlatform = async (req, res) => {
    const  {name, manufacturer} = req.body;
    const query = await pool.query('INSERT INTO platforms (name, manufacturer) VALUES ($1, $2)', [name, manufacturer]);
    res.json(
        { message: 'Platform created', 
            body: { name, manufacturer} 
        }
    );
};

export const PatchPlatform = async (req, res) => {
    const { id } = req.params;
    const { name, manufacture } = req.body;

    try {
        // Verificar si la plataforma existe
        const { rows } = await pool.query('SELECT * FROM platforms WHERE id = $1', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Platform not found' });
        }

        // Construir la consulta SQL dinámica para actualizar la plataforma
        let updateQuery = 'UPDATE platforms SET';
        let updateParams = [];
        let paramIndex = 1;

        if (name) {
            updateQuery += ` name = $${paramIndex},`;
            updateParams.push(name);
            paramIndex++;
        }

        if (manufacture) {
            updateQuery += ` manufacturer = $${paramIndex},`;
            updateParams.push(manufacture);
            paramIndex++;
        }

        // Quitar la coma final de la consulta UPDATE
        updateQuery = updateQuery.slice(0, -1);

        // Añadir la condición WHERE al final de la consulta
        updateQuery += ` WHERE id = $${paramIndex}`;
        updateParams.push(id);

        // Ejecutar la consulta SQL de actualización usando pool.query
        await pool.query(updateQuery, updateParams);

        // Responder con el mensaje de éxito y el ID de la plataforma actualizada
        res.json({ message: 'Platform updated', id });
    } catch (error) {
        console.error('Error en la consulta PATCH:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const DeletePlatform = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM platforms WHERE id = $1', [id]);
        if (rows.length > 0) {
            await pool.query('DELETE FROM platforms WHERE id = $1', [id]);
            res.json({ message: 'Platforms deleted' , id });
        } else {
            res.status(404).json({ message: 'Platforms deleted' });
        }
    } catch (error) {
        console.error(error.message);
    }
};