import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  server: process.env.SERVER_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD_BD,
  database: process.env.DATABASE_NAME,
  options: {
    encrypt: false, // Habilita la encriptación si es necesario
  },
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect(); // Establecer la conexión al inicio

poolConnect.then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

export { pool, poolConnect };
