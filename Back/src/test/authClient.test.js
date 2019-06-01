const assert = require('assert');
const server = require('../../server');
let app = {};
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU1Njc0MjMyM30.SYZs4yDN_UyZsmnPIky7wuv1hXI-pUroJfSuvj6gbk8"
const headers = {
    Authorization: TOKEN
};
const USER = {
    username: 'Xuxadasilva',
    password: 'gustavo@123',
    email: 'pedrinho@gmail.com',
}
const USER_DB = {
   ...USER,
   password: '$2b$04$o6I2lMZuUJAUtu7lXoeIaOfd65au787.IaSD68fE2wkPKUlJa1xJS',
} 

const Mongo = require('../db/mongodb/mongoConnect');
const userCrud = require('../db/mongodb/CRUD/userCrud');

describe.only('Suite de testes de Autenticação', function () {
    this.beforeAll(async () => {
        app = await server;

        await Mongo;
        const result = await userCrud.update(null, USER_DB, true);
        console.log(result);
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER,
        })
        
        const dados = JSON.parse(result.payload);

        assert.deepEqual(result.statusCode, 200);
        assert.ok(dados.token.length > 10);
    })
    
})