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
const hapiJwt = require('hapi-auth-jwt2');

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
        hapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
       /* options: {
            expiresIn: 20
       }*/
       validate: (dados, request) => {
           //Verificar no banco se o usuario continua ativo ou continua pagando
           return {
               isValid: true
           }
       }
    })
    // Usar a authenticação jwt criada
    server.auth.default('jwt');
    // Conectar o mongodb
    await mongoConnect;
    // Iniciar o servidor
    await server.start();

    console.log('Servidor rodando na porta', server.info.port);
    return server;
};

module.exports = connectServer();