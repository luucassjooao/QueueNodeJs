# Queue Node Examplo

Isso é um projeto de estudo focado nos Background-Jobs no NodeJs. A necessidade desse estudo veio pelo fato que tenho outros projetos que enviam e-mails, e como as funções são assíncronas, estava demorando muito para dar uma resposta ao usuário, principalmente em funções/contextos que temos que enviar vários emails.


No projeto, tem apenas uma demonstração de como funciona um Background-Job, o de envio de Email, mas para criar novos Jobs é extremamente fácil, pois a função de queue está abstraída.
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MAIL_HOST`

`MAIL_PORT`

`MAIL_USER`

`MAIL_PASSWORD`

`REDIS_HOST`

`REDIS_PORT`
## Stack utilizada

Node, Express, Bull, @bull-board/express, Nodemailer e TypeScript
## Como rodar o projeto

Clone o projeto

```bash
  git clone https://github.com/luucassjooao/QueueNodeJs.git
```

Entre no diretório do projeto

```bash
  cd QueueNodeJs
```

Instale as dependências

```bash
  yarn
```

Inicie o servidor

```bash
  yarn dev
```

