# Casos de Uso - Sistema de Reserva de Hotel

Este documento detalha as interações entre os atores e o sistema.

## 1. UC01 - Cadastrar Novo Quarto
- **Ator Principal**: Administrador.
- **Resumo**: O administrador insere os dados técnicos e comerciais de um novo quarto no sistema.
- **Pré-condições**: O administrador deve estar autenticado no sistema.
- **Pós-condições**: O quarto é adicionado ao banco de dados e fica visível na listagem de quartos.

## 2. UC02 - Cadastrar Hóspede
- **Ator Principal**: Recepcionista.
- **Resumo**: Registrar as informações pessoais de um novo cliente.
- **Pré-condições**: O recepcionista deve ter acesso ao módulo de hóspedes.
- **Pós-condições**: O hóspede é cadastrado com um CPF único, permitindo que reservas sejam feitas em seu nome.

## 3. UC03 - Efetuar Reserva (Check-in)
- **Ator Principal**: Recepcionista.
- **Resumo**: Vincular um hóspede cadastrado a um quarto com status "Livre".
- **Pré-condições**: O quarto deve estar com status "Livre" e o hóspede deve estar previamente cadastrado.
- **Pós-condições**: O status do quarto muda para "Ocupado" e o nome do hóspede é exibido na lista de reservas.

## 4. UC04 - Alterar Status de Manutenção/Limpeza
- **Ator Principal**: Recepcionista ou Administrador.
- **Resumo**: Alterar manualmente o estado de um quarto para fins operacionais.
- **Pré-condições**: O quarto não deve estar ocupado por um hóspede (para manutenção/limpeza).
- **Pós-condições**: O status é atualizado no sistema, impedindo novas reservas enquanto não retornar ao estado "Livre".
