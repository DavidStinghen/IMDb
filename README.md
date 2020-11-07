# IMDb :clapper:

IMDb :clapper: é uma api para cadastro de filmes, disponibiliza métodos para cadastro, atualização, visualização e listagem.
A api também conta com métodos para avaliação de filmes. Além do cadastro de filmes a api ainda conta com cadastros de usuário/admin
e também com estrutura de sessão. [Aqui](https://bitbucket.org/ioasys/teste-backend/) você encontra as instruções utilizadas na criação da api.

## Instalação/Execução

Para a execução da api é necessário que você tenha instalado o Docker e o Yarn.

- Clone o repositório executando o comando abaixo:
 ```
 $ git clone https://github.com/DavidStinghen/IMDb
 ```
- Acesse a pasta criada e execute o comando abaixo para instalar as dependências da aplicação:
  ```
  $ cd VUTTR
  $ yarn
  ```
- Configure o arquivo .env conforme o arquivo .env.example;
- Inicie o docker e execute os comandos abaixo:
  ```
  $ docker-compose build
  $ docker-compose up
  ```
- Crie uma base de dados em algum gerenciador postgres e execute o comando abaixo para criar as tabelas:
  ```
  $ yarn sequelize db:migrate
  ```

## Documentação

Para executar a documentação da api acesse IMDb/docs/index.html. Caso não seja possível iniciar a documentação execute os comandos abaixo:
```
 $ yarn build:docs
 $ yarn dev:docs
```
