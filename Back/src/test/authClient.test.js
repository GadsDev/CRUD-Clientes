const assert = require('assert');
const server = require('../../server');
let app = {};
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU1Njc0MjMyM30.SYZs4yDN_UyZsmnPIky7wuv1hXI-pUroJfSuvj6gbk8"
const headers = {
    Authorization: TOKEN
};

describe('Suite de testes de Autenticação', function () {
    this.beforeAll(async () => {
        app = await server;
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'Xuxadasilva',
                password: 's',
            }
        })
        
        const dados = JSON.parse(result.payload);

        assert.deepEqual(result.statusCode, 200);
        assert.ok(dados.token.length > 10);
    })
})