# Implementação das Entidades de Domínio

As classes de domínio foram implementadas utilizando TypeScript, seguindo os requisitos e o diagrama de classes definido na Etapa 2.

## Entidades Implementadas

### 1. Quarto
Representa a unidade de acomodação do hotel.
- **Atributos**: Número, capacidade, tipo (Básico, Moderno, Luxo), preço, itens (Frigobar, Café, AC, TV), camas e status de disponibilidade.

### 2. Hóspede
Representa o cliente do hotel.
- **Atributos**: Nome, Sobrenome, CPF e Email.

### 3. Reserva
Gerencia o período de estadia de um hóspede em um quarto.
- **Atributos**: ID, Quarto, Hóspede, Datas e Status.
- **Métodos**: `calcularTotalPreco()`.

## Código Fonte
O código pode ser encontrado em: `./code/domain-entities.ts`
