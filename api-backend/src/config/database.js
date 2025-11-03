const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nombre de la base de datos
  process.env.DB_USER,      // Usuario de la base de datos
  process.env.DB_PASSWORD,  // Contraseña de la base de datos
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    port: process.env.DB_PORT, 
    logging: process.env.NODE_ENV === 'development' ? console.log : false, 
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida exitosamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

connectDB();

module.exports = sequelize;