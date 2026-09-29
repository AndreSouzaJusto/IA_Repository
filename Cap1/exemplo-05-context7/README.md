# Demo: Next.js + Better Auth + GitHub + SQLite

Uma tela unica que inicia o login GitHub, mostra a sessao atual e permite sair. Usuarios e sessoes ficam no arquivo local `better-auth.sqlite`.

## Configuracao

1. Crie um OAuth App em https://github.com/settings/developers com a callback URL `http://localhost:3000/api/auth/callback/github`.
2. Copie `.env.example` para `.env` e preencha os valores.
3. Gere as tabelas e inicie o servidor:

```bash
npx @better-auth/cli migrate
npm run dev
```

Abra http://localhost:3000 e entre com GitHub.

## Dependencias

- `better-auth`
- `better-sqlite3`
