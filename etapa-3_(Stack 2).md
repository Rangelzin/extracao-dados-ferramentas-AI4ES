# Registro da Etapa 3 - Implementação do Core (Quartos) - Stack 2 (Java/Spring)

## Conversa

**Usuário:** Etapa 3 – Construção (Geração de Código) (Stack 2 com Java) iniciando.... Implemente as classes para: Quarto, Hóspede e Reserva.
**Assistente:** 
- Organizou a estrutura de pastas em `./code/stack-1` (antiga) e `./code/stack-2` (nova).
- Criou as entidades de domínio (`Quarto`, `Hospede`, `Reserva`) e Enums em Java no diretório `./code/stack-2/backend`.

**Usuário:** Garanta o POM.
**Assistente:** Criou o arquivo `pom.xml` com Spring Boot 3.2.2, dependências Web e Validation.

**Usuário:** Considerando o módulo de Gestão de Quartos, implemente: Cadastro, Edição e Listagem.
**Assistente:** 
- Implementou o `QuartoController`, `QuartoService` e `QuartoRepository` (In-memory).
- Criou o `QuartoDTO` para validação de entrada com Bean Validation.
- Garantiu suporte a múltiplas camas e todos os campos solicitados.

**Usuário:** Garanta princípios SOLID e clean code e Explique decisões de implementação em comentários.
**Assistente:** 
- Aplicou **DIP** (Dependency Inversion) introduzindo a interface `IQuartoRepository`.
- Refatorou o código para seguir o **SRP** (Single Responsibility Principle).
- Adicionou comentários detalhados justificando escolhas arquiteturais (ex: uso de Java Records, isolamento de camadas).

**Usuário:** Implemente o frontend com html, js e css para consumir essa api no navegador de acordo com os requisitos.
**Assistente:** 
- Desenvolveu uma interface moderna em `./code/stack-2/frontend` usando HTML5, CSS3 (Vanilla) e JavaScript.
- Aplicou a paleta de cores verde/azul solicitada e garantiu a integração total com a API Spring Boot (CRUD completo).

## Artefatos Gerados (Stack 2)

### Backend (Java/Spring)
- [./code/stack-2/backend/pom.xml](./code/stack-2/backend/pom.xml)
- [./code/stack-2/backend/src/main/java/com/hotel/SistemaReservaApplication.java](./code/stack-2/backend/src/main/java/com/hotel/SistemaReservaApplication.java)
- [./code/stack-2/backend/src/main/java/com/hotel/model/Quarto.java](./code/stack-2/backend/src/main/java/com/hotel/model/Quarto.java)
- [./code/stack-2/backend/src/main/java/com/hotel/repository/IQuartoRepository.java](./code/stack-2/backend/src/main/java/com/hotel/repository/IQuartoRepository.java)
- [./code/stack-2/backend/src/main/java/com/hotel/service/QuartoService.java](./code/stack-2/backend/src/main/java/com/hotel/service/QuartoService.java)
- [./code/stack-2/backend/src/main/java/com/hotel/controller/QuartoController.java](./code/stack-2/backend/src/main/java/com/hotel/controller/QuartoController.java)

### Frontend (Vanilla JS)
- [./code/stack-2/frontend/index.html](./code/stack-2/frontend/index.html)
- [./code/stack-2/frontend/css/style.css](./code/stack-2/frontend/css/style.css)
- [./code/stack-2/frontend/js/script.js](./code/stack-2/frontend/js/script.js)

### Documentação e Transcrições
- [./etapa-3_(Stack 2).md](./etapa-3_(Stack%202).md)
