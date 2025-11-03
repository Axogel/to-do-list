const app = require('./app');
const db = require('./models');



const PORT = process.env.PORT || 3000;

    serverOn.listen(PORT, () => {
        console.log(`🚀 Servidor de Express corriendo en http://localhost:${PORT}`);
    });
