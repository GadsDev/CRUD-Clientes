//Pacotes .env
const {
    config
} = require('dotenv');
const {
    join
} = require('path');
const {
    ok
} = require('assert');
//###########################  CONFIG .ENV ##################################
const env = process.env.NODE_ENV || 'dev'
ok(env === 'prod' || env === 'dev', 'a env é invalida, ou dev ou prod');

const configPatch = join(__dirname, './config', `.env.${env}`);
config({
    path: configPatch
})
//###########################################################################
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const mongoConnect = require('./src/db/mongodb/mongoConnect');
const authRoute = require('./src/routes/authRoutes');

// Criar o servidor com suas configurações
const server = Hapi.Server({
    port: process.env.PORT
});

//Função que conecta o servidor
async function connectServer() {
    // Rotas
    server.route(authRoute.login());


    // Config do Swagger
    const swaggerOptions = {
        info: {
            title: 'API-CRUD-Clientes',
            version: 'v1.0',
        },
        lang: 'pt',
    };
    // Plugins Hapi
    await server.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    // Conectar o mongodb
    await mongoConnect;
    // Iniciar o servidor
    await server.start();

    console.log('Servidor rodando na porta', server.info.port);
    return server;
};

module.exports = connectServer();