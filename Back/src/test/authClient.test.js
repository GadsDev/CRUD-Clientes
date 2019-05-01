const assert = require('assert');
const server = require('../../server');
let app = {};

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
                password: '123',
            }
        })
        
        const dados = JSON.parse(result.payload);

        assert.deepEqual(result.statusCode, 200);
        assert.ok(dados.token.length > 10);
    })
})