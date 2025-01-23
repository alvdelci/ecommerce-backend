
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
/**
 * Configurações para habilitar Swagger no projeto.
 */
const swaggerDefinition = {
    info: {
        title: "E-commerce API",
        description: "API documentation",
    },
    servers: ["http://localhost:3333"]
}

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/*.js"]
};

/**
 * Configura o Swagger UI para a aplicação expressjs.
 * @param {express} app Aplicação express
 */
const setup = app => app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = setup;