import { pool } from '../db.js';

export const GetDevelopers = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM developers')
    res.json(rows);
};

export const GetDeveloperById = async (req, res) => {
    const { id } = req.params;
    
    try {
    const { rows } = await pool.query('SELECT * FROM developers WHERE id = $1', [id]);
    console.log(rows);
    if (rows.length > 0) {
        res.json(rows);
    } else {
        res.status(404).json({ message: 'Developer not found' }); 
    }
    } catch (error) {
        console.error(error.message);
    }
};


export const CreateDeveloper = async (req, res) => {
    const  {name, country, website} = req.body;
    const query = await pool.query('INSERT INTO developers (name, country, website) VALUES ($1, $2, $3)', [name, country, website]);
    res.json(
        { message: 'Developer created', 
            body: { name, country, website } 
        }
    );
};

export const PatchDeveloper = async (req, res) => {
    const { id } = req.params;
    const { name, country, website } = req.body;
    
    try {
        const { rows } = await pool.query('SELECT * FROM developers WHERE id = $1', [id]);
        if (rows.length > 0) {
            let updateQuery = 'UPDATE developers SET';
            let updateParams = [];
            let paramIndex = 1;

            if (name) {
                updateQuery += ` name = $${paramIndex},`;
                updateParams.push(name);
                paramIndex++;
            }

            if (country) {
                updateQuery += ` country = $${paramIndex},`;
                updateParams.push(country);
                paramIndex++;
            }

            if (website) {
                updateQuery += ` website = $${paramIndex},`;
                updateParams.push(website);
                paramIndex++;
            }

            updateQuery = updateQuery.slice(0, -1); // Remove the trailing comma
            updateQuery += ` WHERE id = $${paramIndex}`;
            updateParams.push(id);

            await pool.query(updateQuery, updateParams);
            res.json({ message: 'Developer updated', id });
        } else {
            res.status(404).json({ message: 'Developer not found' });
        }
    } catch (error) {
        console.error(error.message);
    }
};

export const DeleteDeveloper = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM developers WHERE id = $1', [id]);
        if (rows.length > 0) {
            await pool.query('DELETE FROM developers WHERE id = $1', [id]);
            res.json({ message: 'Developer deleted' , id });
        } else {
            res.status(404).json({ message: 'Developer not found' });
        }
    } catch (error) {
        console.error(error.message);
    }
};