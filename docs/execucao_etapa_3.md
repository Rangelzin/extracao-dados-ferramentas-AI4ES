# Etapa 3 - Implementação Técnica (Backend & Frontend)

Nesta etapa, o sistema foi transformado em uma aplicação funcional com separação clara entre Backend e Frontend, seguindo princípios SOLID e garantindo uma interface moderna.

## Backend
- **Tecnologia**: Node.js, TypeScript, Express.
- **Estrutura**: Monolito modular com repositórios e serviços.
- **Persistência**: Repositório em memória (assíncrono) para prototipagem rápida.
- **Endpoints**:
  - `GET /api/quartos`: Listagem de quartos.
  - `POST /api/quartos`: Cadastro de novo quarto.
  - `PUT /api/quartos/:numero`: Edição de dados.

## Frontend
- **Tecnologia**: React, TypeScript, Tailwind CSS.
- **UI/UX**: Paleta de cores Azul e Verde, ícones Lucide-React.
- **Funcionalidades**:
  - Cadastro de Quartos via formulário dinâmico.
  - Tabela de listagem com badges de status.
  - Compartilhamento de tipos de domínio.

## Como Executar

### Backend
1. `cd code/backend`
2. `npm install`
3. `npx ts-node server.ts`

### Frontend
1. `cd code/frontend`
2. `npm install`
3. `npm start`
