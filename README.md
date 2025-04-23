# Teste de Desafio para Desenvolvedor Pleno Vue (Front-end)

Este teste técnico é focado exclusivamente no desenvolvimento de um _front-end_ em Vue.js. O candidato deverá implementar um aplicativo com as seguintes funcionalidades:

---

## 🧐 Visão Geral

Desenvolver um front-end em Vue.js que permita:

- Registro de usuário (nome, email, senha)
- Autenticação via JWT
- Exibição de perfil com níveis e missão diária
- Indicação de amigos com link compartilhável e notificações em tempo real

---

## ⚙️ Configuração do Projeto

1. **Instalar Vue CLI**
   ```bash
   npm install -g @vue/cli
   ```
2. **Criar projeto Vue 3 com TypeScript**
   ```bash
   vue create desafio-vue
   ```
3. **Instalar dependências**: axios, vue-router, pinia (ou Vuex)
   ```bash
   cd desafio-vue
   npm install axios vue-router pinia
   ```

---

## Contexto e Objetivo

- Você vai criar um pequeno sistema gamificado com:
  - Cadastro de usuário
  - Login
  - Perfil com níveis e missão diária
  - Página de indicação de amigos, com notificações quase em tempo real
- O propósito é avaliar suas habilidades em Vue 3, TypeScript, consumo de APIs, gerenciamento de estado e atualização dinâmica de interface.

## 🚧 Implementação das Funcionalidades

### 3.1. Formulário de Cadastro

- **Arquivo**: `src/components/RegisterForm.vue`
- **Campos**: `name`, `email`, `password`, `profilePhoto` (input file)
- **Requisitos**:
  1. Usar `v-model` para _two-way binding_
  2. Enviar `FormData` para o endpoint de registro
  3. Exibir mensagens de erro de validação

### 3.2. Login

- **Arquivo**: `src/components/LoginForm.vue`
- **Campos**: `email`, `password`
- **Requisitos**:
  1. Enviar credenciais para o endpoint de login
  2. Armazenar token JWT em `localStorage` ou na store
  3. Proteger rotas privadas com _navigation guards_

### 3.3. Página de Perfil

- **Arquivo**: `src/views/ProfilePage.vue`
- **Funcionalidades**:
  - Exibir nome, nível atual e pontos
  - Mostrar progresso da missão diária com uma barra de progresso
  - Consumir endpoint de perfil usando token de autenticação

### 3.4. Página de Indicação de Amigos

- **Arquivo**: `src/views/ReferralPage.vue`
- **Funcionalidades**:
  1. Gerar e exibir link de indicação
  2. Botão para copiar link
  3. Fazer polling periódico para verificar novas indicações
  4. Atualizar pontos e nível periodicamente
  5. Exibir descrição e progresso da missão diária de indicações

### 4. Sistema de Pontuação e Missões

- Cada indicação vale 100 pts
- Missões diárias de indicação:
  1. 1ª indicação → +500 pts
  2. 3 indicações → +1500 pts + bônus de 500 pts
  3. 10 indicações → +5000 pts + bônus de 1000 pts
- No perfil e na página de indicações, sempre exiba seu progresso em relação à missão do dia.

### 5. Entrega e Avaliação

- Repositório público no GitHub, com commits frequentes.
- README explicando como instalar e rodar localmente.
- Demonstre clareza no código, organização de pastas e consistência no estilo.
- Comentários ou documentação breves em trechos críticos (ex.: lógica de nível, polling).
