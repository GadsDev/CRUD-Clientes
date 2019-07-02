Projeto Feito em JavaScript usando NodeJs e MongoDB usando TDD.
Sistema de cadastro e login para clientes. Usando atenticação JWT e  criptografia Bycript

#Antes de tudo Para instalar as dependencias usadas

    npm install ou
    yarn install

#Variaveis de ambiente para fazer a configuração do projeto

    As variaveis de ambiente devem estar em /Back/config/
    .env.prod
    .env.dev

#É preciso criar a pasta config dentro de Back e os arquivos .env, adicionar as variaveis de ambiente que são a porta do projeto, url de conexão do mongodb e a key do JWT.

    Ex:
    PORT=8000
    MONGODB_URL=mongodb://gadsden:250433@localhost/admin-painel?authSource=admin&w=1
    JWT_SECRET=MINHA_SENHA_SECRETA

#Para rodar os testes

    npm test ou
    yarn run test
    A aplicação vai rodar em http://localhost:PORT/

#Documentação com as rotas

    http://localhost:port/documentation
    Ex: http://localhost:8000/documentation