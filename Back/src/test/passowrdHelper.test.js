const assert = require('assert');

const PasswordHelper = require('../helpers/passwordHelper');
const SENHA = 'gustavo@123';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU1Njc0MjMyM30.SYZs4yDN_UyZsmnPIky7wuv1hXI-pUroJfSuvj6gbk8"
const headers = {
    Authorization: TOKEN
};

describe.only('UserHelper test suit', function () {
    it('Deve gerar um hash apartir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);
        console.log('result', result);
        assert.ok(result.length > 10);
    });
})