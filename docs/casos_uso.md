# Casos de Uso - Sistema de Reserva de Hotel

Este documento descreve os principais Casos de Uso (UC) do sistema, detalhando atores, pré-condições e pós-condições.

**Ator Principal:** Recepcionista

## UC01 - Manter Quartos
**Descrição:** Permite ao recepcionista gerenciar o cadastro de quartos do hotel (incluir, alterar, listar).

- **Atores:** Recepcionista
- **Pré-condições:**
    - O usuário deve estar autenticado no sistema (implícito).
    - Para alterações, o quarto deve existir no sistema.
- **Pós-condições:**
    - Um novo quarto é registrado no sistema.
    - As informações de um quarto existente são atualizadas.
    - O status de disponibilidade do quarto é modificado.

## UC02 - Manter Hóspedes
**Descrição:** Permite ao recepcionista cadastrar e consultar hóspedes.

- **Atores:** Recepcionista
- **Pré-condições:**
    - O usuário deve estar autenticado no sistema.
- **Pós-condições:**
    - Um novo hóspede é cadastrado com sucesso.
    - Dados de hóspedes podem ser recuperados para visualização ou uso em reservas.

## UC03 - Realizar Reserva
**Descrição:** Permite ao recepcionista criar uma nova reserva para um hóspede em um quarto disponível.

- **Atores:** Recepcionista
- **Pré-condições:**
    - O hóspede já deve estar cadastrado no sistema (ou ser cadastrado no ato).
    - Deve haver pelo menos um quarto com status "Livre" para o período desejado.
- **Pós-condições:**
    - Uma nova reserva é criada e associada ao hóspede e quarto.
    - O status do quarto selecionado é alterado para "Ocupado" no período da reserva.
    - O registro da reserva fica disponível para consulta e gestão.

## UC04 - Gerenciar Reservas Existentes
**Descrição:** Permite ao recepcionista visualizar, editar ou cancelar reservas.

- **Atores:** Recepcionista
- **Pré-condições:**
    - A reserva deve existir no sistema.
- **Pós-condições:**
    - A reserva tem seus dados atualizados (ex: troca de quarto, alteração de datas).
    - Se cancelada/finalizada, o quarto associado pode ter seu status alterado para "Livre" ou "Limpeza".
