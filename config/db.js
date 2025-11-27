require('dotenv').config();

const mysql = require('mysql2/promise');

const dburl = process.env.DATABASE_URL || "";

if(!dburl){
    throw new Error('DATABASE_URL belum diset di .env');
}

const url = new URL(dburl);

//ini buat bank koneksi, sistemnya kayak pinjem kalo butuh jadi ga perlu buka tutup koneksi ke dtaabase lagi
const pool = mysql.createPool({
    //ini misahin si DATABASE_URL jadi begini
    host     : url.hostname,
    user     : url.username,
    password : url.password,
    // ini tuh biar takutnya kalo slash dibagian database_url itu ga kebaca
    database : url.pathname.replace(/^\//, ""),
    port     : url.port ? Number(url.port) : 3306,
    waitForConnections : true,
    // ini tuh dikasi limit koneksu cuma 10 aja yg akses
    connectionLimit : 10,
    queueLimit      : 0
})

module.exports = pool;