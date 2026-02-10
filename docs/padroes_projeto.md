# Padrões de Projeto (Design Patterns) - Sistema de Reserva de Hotel

Este documento lista e justifica os padrões de projeto (GoF e Enterprise) recomendados para a implementação do sistema, alinhados com a arquitetura de Monolito Modular.

## Padrões Arquiteturais e de Estrutura

### 1. Repository Pattern
- **Tipo**: Padrão de Acesso a Dados (Enterprise Application Architecture).
- **Aplicação**: Abstrair a lógica de acesso ao banco de dados (ORM/SQL) das regras de negócio (Services).
- **Justificativa**: Permite testar a camada de serviços isoladamente (mockando o repositório) e facilita a troca ou atualização da tecnologia de banco de dados sem impactar o negócio.
- **Exemplo**: `QuartoRepository`, `ReservaRepository`.

### 2. Dependency Injection (DI)
- **Tipo**: Inversão de Controle (IoC).
- **Aplicação**: Injetar as dependências (Services, Repositories) nas classes que precisam delas (Controllers), ao invés de instanciar diretamente.
- **Justificativa**: Desacoplamento. Facilita testes unitários e a manutenção, pois as dependências são geridas por um container (comum em frameworks Node.js modernos como NestJS).

### 3. Data Transfer Object (DTO)
- **Tipo**: Padrão de Distribuição.
- **Aplicação**: Objetos simples para transportar dados entre processos ou camadas (Frontend <-> Controller <-> Service).
- **Justificativa**: Desacopla o modelo de domínio (Entidades do Banco) da API pública. Permite validar dados de entrada e formatar dados de saída sem expor detalhes internos do banco.
- **Exemplo**: `CriarReservaDTO`, `AtualizarHospedeDTO`.

## Padrões de Criação (Creational)

### 4. Singleton Pattern
- **Tipo**: GoF Criacional.
- **Aplicação**: Garantir uma única instância de classes de infraestrutura, como a conexão com o banco de dados ou o Logger.
- **Justificativa**: Evita múltiplas conexões desnecessárias com o banco e centraliza recursos compartilhados. Geralmente gerido pelo container de DI.

### 5. Factory Method
- **Tipo**: GoF Criacional.
- **Aplicação**: Encapsular a lógica de criação de objetos complexos. Pode ser usado para criar instâncias de Quartos com configurações padrão baseadas no tipo (Básico, Luxo).
- **Justificativa**: Centraliza a lógica de instanciação, permitindo adicionar novos tipos de quartos sem alterar o código que solicita a criação.

## Padrões Comportamentais (Behavioral)

### 6. Strategy Pattern
- **Tipo**: GoF Comportamental.
- **Aplicação**: Definir uma família de algoritmos intercambiáveis. Pode ser aplicado no cálculo de preços de reservas (ex: `PrecoPadraoStrategy`, `PrecoAltaTemporadaStrategy`, `PrecoFidelidadeStrategy`).
- **Justificativa**: Permite alterar a regra de precificação em tempo de execução ou adicionar novas regras sem modificar a classe de Reserva (Princípio Aberto/Fechado - OCP).

### 7. Observer Pattern (ou Pub/Sub)
- **Tipo**: GoF Comportamental.
- **Aplicação**: Notificar partes do sistema sobre eventos de domínio. Exemplo: Quando uma reserva é confirmada (evento), disparar envio de email e atualização de métricas.
- **Justificativa**: Desacopla a ação principal (reservar) dos efeitos colaterais (email, log), mantendo o método de reserva coeso e rápido.

## Padrões Estruturais (Structural)

### 8. Facade Pattern
- **Tipo**: GoF Estrutural.
- **Aplicação**: Fornecer uma interface simplificada para um subsistema complexo. Um `ReservaService` atua como Facade, coordenando chamadas para `QuartoService`, `HospedeService` e `PagamentoService`.
- **Justificativa**: Simplifica o uso do sistema para os Controllers, escondendo a complexidade das interações entre múltiplos módulos.
