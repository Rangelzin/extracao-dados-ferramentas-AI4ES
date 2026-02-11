# Padrões de Projeto Sugeridos

Este documento descreve os padrões de projeto aplicáveis ao sistema de reserva de hotel e suas respectivas justificativas.

## 1. Padrões Criacionais

### Factory (Fábrica)
- **Onde**: No serviço de criação de Quartos e Reservas.
- **Justificativa**: Centraliza a lógica de criação de objetos complexos, garantindo que todas as dependências e validações iniciais (como a configuração de camas) sejam respeitadas antes da persistência.

## 2. Padrões Estruturais

### Repository (Repositório)
- **Onde**: Comunicação entre a Camada de Aplicação e a Infraestrutura.
- **Justificativa**: Cria uma abstração sobre a persistência de dados. Facilita a substituição de bibliotecas de banco de dados (ex: de TypeORM para Prisma) e permite a criação de Mocks para testes unitários de forma simplificada.

### Data Transfer Object (DTO)
- **Onde**: Comunicação entre Frontend (React) e Backend (Node.js).
- **Justificativa**: Define contratos claros de entrada e saída de dados, evitando a exposição desnecessária de campos internos das entidades de banco de dados.

## 3. Padrões Comportamentais

### Strategy (Estratégia)
- **Onde**: Cálculo de preços e regras de desconto.
- **Justificativa**: Permite encapsular algoritmos de precificação que podem variar conforme o tipo de quarto ou época do ano, mantendo o código de reserva limpo e extensível.

### State (Estado)
- **Onde**: Gerenciamento da disponibilidade do quarto.
- **Justificativa**: O comportamento de um quarto muda drasticamente conforme seu estado (ex: um quarto em "Manutenção" não pode ser reservado). O padrão State ajuda a gerenciar essas transições de forma robusta.
