require('dotenv').config();
const express = require('express');
const app = express();

// import routes
const siswaRoutes = require('./routes/siswaRoutes');

// middleware global
app.use(express.json()); // supaya bisa baca body JSON

// mount routes
app.use('/siswa', siswaRoutes);

// basic error handler
app.use((err, req, res, next) => {
    console.error(err); // log ke console
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server berjalan di http://127.0.0.1:${PORT}`);
});
