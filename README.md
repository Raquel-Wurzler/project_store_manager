# Project Store Manager

Este repositório contém o projeto Store Manager desenvolvido por [Raquel G. C Würzler](https://www.linkedin.com/in/raquel-c-wurzler/) enquanto estudava na [Trybe](https://www.betrybe.com/) no módulo de BackEnd :rocket:

_"A Trybe é uma escola do futuro para qualquer pessoa que queira melhorar de vida e construir uma carreira de sucesso em tecnologia, onde a pessoa paga quando conseguir um bom trabalho."_

#### Projeto de conclusão da seção 5, no módulo de Back-end

### Principal objetivo:
* Criar uma API utilizando a Arquitetura de Software MSC (model-service-controller).
A API é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar (CRUD - Create, Read, Update e Delete) produtos e vendas em um banco de dados MySql.

### Detalhes desse projeto:
* Utilização de um servidor Noje.js;
* Utilização do framework Express para criar uma rota de um endpoint de API, acessível pelo navegador;
* Para melhorar a organização utilizei o express.Router() pra separar os endpoints em outros arquivos;
* Os endpoints foram feitos em arquivos separados pelas rotas: "/products" e "/sales" e estão na pasta router;
* Os middlewares foram salvos em uma pasta separada;
* Foram feitos middlewares de validação para "Name" e "Sale";
* A pasta Utils contém as função "errorMap", que recebe o type como parâmetro e retorna o Status Code HTTP do erro;
* Pastas separadas para cada camada do MSC (Model, Service, Controller);
* Testes unitários usando Mocha, Sinon, Chai;

##### Arquivos disponibilizados pela Trybe:
* .editorconfig;
* .eslintignore;
* .eslintrc.json;
* .gitignore;
* .npmrc;
* docker-compose.yml;
* jest.config.js;
* migration.sql;
* package-lock.json;
* package.json;
* seed.sql;
* trybe-filter-repo.sh;
* a pasta *thunder-tests*;

## Stack utilizada

**Back-end:** Node, Express, JavaScript, MySql, MSC, Mocha, Sinon, Chai

## Instalação e uso

```bash
# Abra um terminal e copie este repositório com o comando
git clone git@github.com:Raquel-Wurzler/project_store_manager.git

# Entre na pasta do projeto 
cd project_store_manager

# Instale as dependências
yarn install
ou 
npm install

# Rode o servidor
npm run debug
ou
npm start

# Configure o arquivo .env com suas informações
conforme o arquivo .env-example

# Rode a aplicação
usando extensão Live Server no vs-code na porta que você especificar no arquivo .env

```

