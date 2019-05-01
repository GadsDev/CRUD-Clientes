//Pacotes .env
const {config} = require('dotenv');
const {join} = require('path');
const {ok} = require('assert');
//###########################  CONFIG .ENV ##################################
const env = process.env.NODE_ENV || 'dev'
ok(env === 'prod' || env === 'dev', 'a env é invalida, ou dev ou prod');

const configPatch = join(__dirname,'./config', `.env.${env}`);
config ({
    path: configPatch
})
//###########################################################################

const Hapi = require('hapi');

// Criar o servidor com suas configurações
const server = Hapi.Server({
    port: process.env.PORT
});

//Função que conecta o servidor
async function connectServer() {

    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    })    ;

    await server.start();
    console.log('Servidor rodando na porta', server.info.port);

};

connectServer();