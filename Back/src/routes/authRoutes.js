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

const headers = joi.object({
    authorization: joi.string().required(),
}).unknown();
  
module.exports = {

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                // Não precisa de token pois ela gera o token
                auth: false,
                tags: ['api'],
                description: 'Obter Token',
                notes: 'Faz login com user e senha do banco',
                validate: {
                    failAction,
                    payload: {
                        username: joi.string().required(),
                        password: joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                const { username, password } = request.payload;

                //Se o login ou senha incorreto retorna não autorizado
                if(
                    username.toLowerCase() !== USER.username || 
                    password !== USER.password
                )
                    return boom.unauthorized();
                
                const token = jwt.sign({
                    username: username,
                    id: 1
                }, process.env.JWT_SECRET)
                return {
                    token
                }

            }
        }
    }
}