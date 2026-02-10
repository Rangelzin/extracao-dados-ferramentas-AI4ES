# Arquitetura do Sistema de Reserva de Hotel

## Descrição Geral

Para o Sistema de Reserva de Hotel, considerando que o domínio é um **único hotel** e o foco está em manutenibilidade, organização e facilidade de implantação, a arquitetura definida é um **Monolito Modular em Camadas (Layered Modular Monolith)**.

### Stack Tecnológica Definida
- **Frontend**: React (SPA) com TypeScript.
- **Backend**: Node.js com TypeScript (Framework NestJS ou Express).
- **Banco de Dados**: PostgreSQL.

### Por que Monolito Modular?
Uma arquitetura de microserviços adicionaria complexidade desnecessária (deploy, comunicação entre serviços, latência) para o escopo de um único hotel. O monolito modular permite:
- **Simplicidade Operacional**: Deploy único.
- **Isolamento de Domínio**: Módulos bem definidos (Quartos, Hóspedes, Reservas) que evitam o "Spaghetti Code".
- **Performance**: Comunicação interna direta (in-process calls) sem overhead de rede.
- **Evolução**: Facilidade para extrair microserviços no futuro, se necessário.

---

## Visão Geral das Camadas

O sistema será dividido em duas grandes partes físicas: **Frontend** (Cliente) e **Backend** (Servidor).

### 1. Frontend (Single Page Application - SPA)
Responsável pela interface com o usuário (Recepcionista).
- **Tecnologia**: **React (TypeScript)**.
- **Responsabilidades**:
  - Renderização da UI.
  - Consumo da API REST do Backend.
  - Validações de formulário no lado do cliente.
  - Gestão de estado da aplicação.

### 2. Backend (API REST)
Responsável pela lógica de negócios e persistência de dados.
- **Tecnologia**: **Node.js (TypeScript)**.
- **Estilo Arquitetural**: Camadas (Layers).

#### Camadas do Backend

1.  **Interface Layer (API / Controllers)**
    - Recebe as requisições HTTP (GET, POST, PUT, DELETE).
    - Valida inputs básicos.
    - Delega para a camada de Serviços.
    - Retorna respostas JSON para o Frontend.

2.  **Application / Service Layer (Regras de Negócio)**
    - Contém a lógica de negócio (ex: "Não permitir reserva se quarto ocupado").
    - Orquestra as operações entre repositórios.
    - Implementa os Casos de Uso.
    - **Módulos**:
        - `ModuleQuartos`: Lógica de cadastro e gestão de quartos.
        - `ModuleHospedes`: Lógica de cadastro de hóspedes.
        - `ModuleReservas`: Lógica de criação e gestão de reservas.

3.  **Infrastructure / Persistence Layer (Dados)**
    - Acesso ao Banco de Dados (Repositories / DAOs).
    - Mapeamento Objeto-Relacional (ORM) - Prisma ou TypeORM.
    - Integrações externas (se houver).

### 3. Banco de Dados
- **Tecnologia**: **PostgreSQL**.
- **Justificativa**: Dados estruturados e relacionais (Reservas ligam Quartos e Hóspedes) exigem integridade referencial forte (Transactions, Foreign Keys).

---

## Diagrama Conceitual (Mermaid)

```mermaid
graph TD
    User((Recepcionista)) -->|Acessa via Browser| Frontend[Frontend SPA (React)]
    
    subgraph "Navegador do Cliente"
        Frontend
    end

    Frontend -->|HTTPS / JSON| API[API Gateway / Load Balancer]
    
    subgraph "Backend Node.js (Monolito Modular)"
        API --> Controller[Controllers Layer]
        
        subgraph "Business Logic Modules"
            Controller --> ServiceQuartos[Módulo Quartos]
            Controller --> ServiceHospedes[Módulo Hóspedes]
            Controller --> ServiceReservas[Módulo Reservas]
            
            ServiceReservas -.->|Verifica Disp.| ServiceQuartos
            ServiceReservas -.->|Verifica Cadastro| ServiceHospedes
        end
        
        ServiceQuartos --> RepoQuartos[Repositório Quartos]
        ServiceHospedes --> RepoHospedes[Repositório Hóspedes]
        ServiceReservas --> RepoReservas[Repositório Reservas]
    end

    RepoQuartos --> DB[(PostgreSQL)]
    RepoHospedes --> DB
    RepoReservas --> DB
```

---

## Justificativa da Escolha Arquitetural

A escolha pelo **Monolito Modular** com **Stack JS (React/Node)** é baseada nos seguintes pilares:

### 1. Desempenho (Performance)
- **Latência Zero entre Módulos**: A comunicação entre serviços ocorre em memória, eliminando overhead de rede.
- **Non-blocking I/O (Node.js)**: Ideal para sistemas com alto I/O como reservas (leitura/escrita em DB), otimizando o uso de recursos.
- **Transações ACID**: O uso de PostgreSQL permite transações atômicas seguras e performáticas.

### 2. Escalabilidade
- **Escalabilidade Horizontal**: O Node.js escala bem horizontalmente com múltiplos processos (PM2 ou Cluster) atrás de um Load Balancer.
- **Stateless**: O uso de JWT permite escalar instâncias do backend sem preocupação com sessões.

### 3. Manutenibilidade e Evolução
- **Linguagem Unificada (TypeScript)**: Reduz a carga cognitiva da equipe fullstack e permite compartilhamento de tipos/interfaces entre Frontend e Backend.
- **Tipagem Estática**: O TypeScript previne uma classe inteira de erros comuns em runtime, crucial para a robustez de um sistema de reservas.
- **Ecossistema Rico**: Bibliotecas maduras para React e Node.js aceleram o desenvolvimento.
