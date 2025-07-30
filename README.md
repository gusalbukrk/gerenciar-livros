# gerenciar-livros

Prova Técnica para a vaga de Analista de Sistemas Jr. A descrição da prova está em [prova.pdf](./prova.pdf).

Uma versão simplificada deste projeto, que foi desenvolvida sem frameworks e não requer um servidor back-end, está disponível em [gerenciar-livros-nativo](https://github.com/gusalbukrk/gerenciar-livros-nativo).

## Tech stack

- **Linguagem**: TypeScript
- **Banco de Dados**: MySQL
- **Frameworks e bibliotecas**:
    - Next.js: framework de React para desenvolvimento web full-stack.
    - React: biblioteca de JavaScript para construção de interfaces de usuário.
    - Prisma: ORM.
    - Tailwind: framework CSS.
    - DaisyUI: biblioteca de componentes para Tailwind.

## Como executar a aplicação

### Pré-requisitos

- Node.js >= 22
- Servidor MySQL em execução

### Instruções

1. Clone o repositório.
2. Rode `npm i` para instalar as dependências.
3. Mova o arquivo `.env` enviado por email para a raiz do projeto.
4. As credenciais do banco de dados configuradas no projeto é user `root` e senha `password`. Para alterar, edite a linha 19 do arquivo `prisma/schema.prisma`.
5. Rode `npx prisma migrate dev && npx prisma db seed` para criar as tabelas no banco de dados e popular com dados iniciais.
6. Rode `npm run dev` para iniciar o servidor de desenvolvimento.
7. Acesse a aplicação em `http://localhost:3000`.
