const app = require('../index');  // Importando a configuração do Express
const connection = require('./db/connection');

const port = 3333;

// Connect to MongoDB
connection();

//swagger setup
require("../swagger-setup")(app);

// Initialize the server
app.listen(port, () => {
    console.log(`Server online on port ${port}`);
});