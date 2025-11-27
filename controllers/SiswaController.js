const pool = require('../config/db');

module.exports = {
    // GET /api/siswa
    getAll: async (req, res, next) => {
        try {
            const [rows] = await pool.execute('SELECT * FROM siswa ORDER BY id DESC');
            res.json(rows);
        } catch (err) {
            next(err);
        }
    },

    // GET /api/siswa/:id
    getById: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [rows] = await pool.execute('SELECT * FROM siswa WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ message: 'Data Siswa tidak ditemukan' });
            res.json(rows[0]);
        } catch (err) {
            next(err);
        }
    },

    // POST /api/siswa
    create: async (req, res, next) => {
        try {
            const { name, email, alamat } = req.body;
            const [result] = await pool.execute(
                'INSERT INTO siswa (name, email, alamat) VALUES (?, ?, ?)',
                [name, email, alamat]
            );
            res.status(201).json({ id: result.insertId, name, email, alamat});
        } catch (err) {
            next(err);
        }
    },

    // PUT /api/siswa/:id
    update: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, email, alamat } = req.body;

            const fields = [];
            const values = [];

            if (name !== undefined) { fields.push('name=?'); values.push(name); }
            if (email !== undefined) { fields.push('email=?'); values.push(email); }
            if (alamat !== undefined) { fields.push('alamat=?'); values.push(alamat); }

            if (fields.length === 0) return res.status(400).json({ message: 'Nothing to update' });

            values.push(id);
            const sql = `UPDATE siswa SET ${fields.join(', ')} WHERE id=?`;
            const [result] = await pool.execute(sql, values);

            if (result.affectedRows === 0) return res.status(404).json({ message: 'Data siswa tidak ditemukan' });

            res.json({ message: 'Data siswa berhasil diperbarui' });
        } catch (err) {
            next(err);
        }
    },

    // DELETE /api/siswa/:id
    remove: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.execute('DELETE FROM siswa WHERE id=?', [id]);

            if (result.affectedRows === 0) return res.status(404).json({ message: 'Data Siswa tidak ditemukan.' });

            res.json({ message: 'Data siswa berhasil dihapus.' });
        } catch (err) {
            next(err);
        }
    }
};
