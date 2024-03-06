import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root', 
  database: 'dog_blog_db', 
  password: 'root_dog_blog_password', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
