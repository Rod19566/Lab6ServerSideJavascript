import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', // Cambia esto al host de tu servidor MySQL
  user: 'dog_blog_user', // Cambia esto al usuario de tu base de datos
  database: 'dog_blog_db', // Cambia esto al nombre de tu base de datos
  password: 'dog_blog_password', // Cambia esto a la contraseña de tu base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
