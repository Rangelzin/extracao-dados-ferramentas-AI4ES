# Testes Unitários - Gestão de Quartos

Este documento descreve os testes unitários implementados para garantir a qualidade e o funcionamento correto do módulo de Gestão de Quartos.

## Framework Utilizado
- **Jest**: Framework de testes principal.
- **ts-jest**: Suporte para TypeScript com ESM.

## Suítes de Testes

### 1. Cadastro de Quarto
- **Sucesso**: Verifica se um quarto é criado com os atributos corretos e persistido no repositório.
- **Duplicidade**: Garante que o sistema impede o cadastro de dois quartos com o mesmo número.
- **Validação**: Assegura que o campo `numero` é obrigatório.

### 2. Edição de Quarto
- **Sucesso**: Confirma que atributos como `precoDiaria` e `status` podem ser atualizados em um quarto existente.
- **Erro**: Valida que o sistema lança uma exceção ao tentar editar um quarto que não existe no banco de dados (memória).

## Como Executar
No diretório `code/backend`:
```bash
npm test
```
