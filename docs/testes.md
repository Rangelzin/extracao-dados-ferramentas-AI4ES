# Documentação de Testes de Software - Sistema de Reserva de Hotel

## Visão Geral
Esta etapa foca na garantia da qualidade do código através de testes unitários automatizados. O objetivo é validar a lógica de negócios isolada de dependências externas (como banco de dados).

## Ferramentas
- **Framework de Teste**: Jest
- **Linguagem**: TypeScript (ts-jest)
- **Mocking**: Jest Mocks

## Escopo dos Testes (Etapa 4)

### 1. Módulo de Gestão de Quartos (`QuartoService`)

O `QuartoService` é o componente central responsável pela orquestração das operações de quartos.

#### Cenários de Teste: Cadastro de Quarto (`cadastrarQuarto`)

| ID | Cenário | Entrada | Comportamento Esperado |
|---|---|---|---|
| **CT01** | Cadastro com dados válidos | DTO com número "101", tipo "Luxo", etc. | - Chamar `repository.save` <br> - Retornar DTO com ID gerado <br> - Persistir camas corretamente |
| **CT02** | Tentativa de duplicidade | DTO com número "101" (já existente) | - Lançar Exceção ("Quarto já existe") <br> - NÃO chamar `repository.save` |

#### Cenários de Teste: Edição de Quarto (`editarQuarto`)

| ID | Cenário | Entrada | Comportamento Esperado |
|---|---|---|---|
| **CT03** | Edição de quarto existente | ID válido, DTO com novos dados | - Chamar `repository.update` com dados mesclados <br> - Retornar DTO atualizado |
| **CT04** | Edição de quarto inexistente | ID inexistente | - Lançar Exceção ("Quarto não encontrado") <br> - NÃO chamar `repository.update` |

## Instruções de Execução

Para rodar os testes, utilize o comando na pasta `code/backend`:

```bash
npm test
```
