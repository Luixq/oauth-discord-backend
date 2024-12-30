# Projeto: Autenticação com OAuth2 do Discord e Sistema de Sessão

## 1. Backend
- ### Autenticação
  - Fluxo OAuth2 do Discord.
    - URL de autorização.
    - Troca de código por tokens.
    - Armazenamento de tokens no banco.
  - Validação de tokens.
    - Verificação do token no Discord.
    - Renovação de tokens expirados.

- ### Sistema de Sessão
  - Criação de sessão após login.
  - Validação da sessão nas requisições.
  - Encerramento de sessão (logout).

- ### Rotas API
  - `GET /auth/login`
    - Redireciona para o fluxo OAuth2.
  - `GET /auth/callback`
    - Recebe o código do Discord.
    - Processa e cria/atualiza o usuário.
    - Gera a sessão.
  - `POST /auth/logout`
    - Encerra a sessão do usuário.
  - `POST /@me`
    - Retorna os dados do usuário.

---

## 2. Frontend
- ### Login
  - Botão para iniciar o fluxo OAuth2.
  - Redirecionamento para a API.

- ### Dashboard
  - Página acessível apenas após login.
  - Exibe informações do usuário:
    - Nome e avatar do Discord.
    - Sessão ativa.

- ### Sessão
  - Cookies ou localStorage para armazenar sessão.
  - Atualização automática com o token de atualização.

---

## 3. Fluxo do Usuário
1. O usuário clica no botão de login.
2. Redirecionamento para a autorização no Discord.
3. O Discord retorna o código para a API.
4. A API processa o código:
   - Busca ou cria o usuário no banco de dados.
   - Gera a sessão.
5. O usuário é redirecionado para a dashboard.
6. O usuário pode visualizar a dashboard enquanto a sessão estiver ativa.
7. Logout encerra a sessão e redireciona para a página de login.