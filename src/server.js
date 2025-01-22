const app = require('../index');  // Importando a configuração do Express
const connection = require('./db/connection');

const port = 3333;

// Conectando ao MongoDB
connection();

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Server online on port ${port}`);
});