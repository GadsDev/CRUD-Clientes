const joi = require('joi');
const boom = require('boom');
const jwt = require('jsonwebtoken');

const failAction = (request, headers, erro) => {
    throw erro;
};

const USER = {
    username: 'xuxadasilva',
    password: '123',
}

// Adicionar em todos as rotas para receber a autorização
const headers = joi.object({
    authorization: joi.string().required()
}).unknown()

const headers = joi.object({
    authorization: joi.string().required(),
}).unknown();
  
module.exports = {

    list() {
        return {
            path: '/list',
            method: 'POST',
            config: {
               
            },
            handler: async (request) => {               
                return 
                    null
                

            }
        }
    }
}