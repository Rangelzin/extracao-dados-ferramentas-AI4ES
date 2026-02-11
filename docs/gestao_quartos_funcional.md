# Implementação da Gestão de Quartos

Este documento detalha a implementação das funcionalidades de Cadastro, Edição e Listagem de Quartos.

## Funcionalidades Implementadas

### 1. Cadastro de Quarto
- Permite a criação de um novo quarto com todos os campos obrigatórios: número, capacidade, tipo, preço e amenidades.
- Suporta a adição de múltiplas camas (Solteiro, King, Queen) através da composição da classe `Cama`.

### 2. Edição de Quarto
- Permite atualizar as informações de um quarto existente buscando-o pelo seu número identificador.

### 3. Listagem de Quartos
- Exibe os dados principais exigidos:
    - **Número**
    - **Tipo**
    - **Preço por Diária**
    - **Disponibilidade** (Livre, Ocupado, Manutenção, Limpeza)

## Regras de Negócio Aplicadas
- Validação de duplicidade de número de quarto no cadastro.
- Persistência em memória (preparada para integração com banco de dados via padrão Repository).

## Localização do Código
- Lógica e Repositório: `./code/gestao-quartos.ts`
- Entidades: `./code/domain-entities.ts`
