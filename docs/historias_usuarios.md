# Histórias de Usuário e Critérios de Aceitação - Sistema de Reserva de Hotel

Este documento descreve as Histórias de Usuário (User Stories) e seus respectivos Critérios de Aceitação no formato **Given-When-Then** (Dado-Quando-Então), além de vincular aos Requisitos Funcionais (RF) correspondentes.

O ator principal identificado para estas histórias é o **Recepcionista do Hotel**.

## Gestão de Quartos

### HU01 - Cadastrar Quarto
*Requisitos Relacionados: RF01.1, RF01.3, RF01.4*
**Como** Recepcionista,
**Eu quero** cadastrar um novo quarto no sistema com todas as suas características (número, capacidade, tipo, preço, comodidades e camas),
**Para que** eu possa disponibilizá-lo para reservas futuras.

**Critérios de Aceitação:**
- **Cenário 1: Cadastro com sucesso**
  - **DADO QUE** estou na tela de cadastro de quartos
  - **QUANDO** preencho todos os campos obrigatórios (Número, Capacidade, Tipo, Preço)
  - **E** clico no botão "Salvar"
  - **ENTÃO** o sistema deve exibir uma mensagem de sucesso "Quarto cadastrado com sucesso"
  - **E** o novo quarto deve aparecer na lista de quartos.

- **Cenário 2: Preço inválido**
  - **DADO QUE** estou na tela de cadastro
  - **QUANDO** preencho o campo preço com um valor negativo
  - **ENTÃO** o sistema deve exibir uma mensagem de erro "O preço deve ser maior que zero".

### HU02 - Atualizar Informações do Quarto
*Requisitos Relacionados: RF01.2*
**Como** Recepcionista,
**Eu quero** editar as informações de um quarto existente,
**Para que** eu possa corrigir erros de cadastro ou atualizar preços e características conforme necessário.

**Critérios de Aceitação:**
- **Cenário 1: Edição de preço**
  - **DADO QUE** selecionei um quarto para edição
  - **QUANDO** altero o preço da diária
  - **E** salvo as alterações
  - **ENTÃO** o novo preço deve ser atualizado no sistema.

### HU03 - Listar Quartos Disponíveis
*Requisitos Relacionados: RF02.1*
**Como** Recepcionista,
**Eu quero** visualizar uma lista de todos os quartos com seus status de disponibilidade,
**Para que** eu possa identificar rapidamente quais quartos estão livres, ocupados ou em manutenção.

**Critérios de Aceitação:**
- **Cenário 1: Listagem padrão**
  - **DADO QUE** existem quartos cadastrados
  - **QUANDO** acesso a página de listagem de quartos
  - **ENTÃO** devo ver uma tabela com as colunas: Número, Tipo, Preço e Disponibilidade.

### HU04 - Alterar Status do Quarto
*Requisitos Relacionados: RF02.2*
**Como** Recepcionista,
**Eu quero** alterar o status de disponibilidade de um quarto (ex: colocar em manutenção),
**Para que** o sistema reflita a realidade física do quarto e evite reservas indevidas.

**Critérios de Aceitação:**
- **Cenário 1: Mudar para manutenção**
  - **DADO QUE** um quarto está com status "Livre"
  - **QUANDO** altero o status para "Manutenção"
  - **ENTÃO** o quarto não deve mais aparecer como disponível para novas reservas.

## Gestão de Hóspedes

### HU05 - Cadastrar Hóspede
*Requisitos Relacionados: RF03.1, RF03.2*
**Como** Recepcionista,
**Eu quero** registrar os dados pessoais de um novo hóspede (Nome, CPF, Email),
**Para que** eu possa criar uma ficha de cadastro e vincular a reservas.

**Critérios de Aceitação:**
- **Cenário 1: Cadastro completo**
  - **DADO QUE** estou na tela de cadastro de hóspedes
  - **QUANDO** informo Nome, Sobrenome, CPF e Email válidos
  - **E** clico em "Salvar"
  - **ENTÃO** o hóspede é registrado no sistema.

- **Cenário 2: Email inválido**
  - **DADO QUE** estou na tela de cadastro
  - **QUANDO** informo um email sem "@" ou domínio
  - **ENTÃO** o sistema deve exibir mensagem "Email inválido".

### HU06 - Consultar Hóspedes
*Requisitos Relacionados: RF04.1, RF04.2*
**Como** Recepcionista,
**Eu quero** buscar e listar os hóspedes cadastrados, visualizando suas informações básicas (exceto e-mail na listagem),
**Para que** eu possa verificar se uma pessoa já possui cadastro ou encontrar seus dados rapidamente.

**Critérios de Aceitação:**
- **Cenário 1: Visualização da lista**
  - **DADO QUE** acesso a lista de hóspedes
  - **ENTÃO** devo ver os campos Nome, Sobrenome e CPF
  - **E** o campo Email NÃO deve estar visível na listagem.

## Gestão de Reservas

### HU07 - Criar Reserva
*Requisitos Relacionados: RF05.1, RF05.3*
**Como** Recepcionista,
**Eu quero** associar um quarto livre a um hóspede cadastrado,
**Para que** eu possa garantir a hospedagem do cliente na data desejada.

**Critérios de Aceitação:**
- **Cenário 1: Reservar quarto livre**
  - **DADO QUE** seleciono um quarto com status "Livre"
  - **E** seleciono um hóspede cadastrado
  - **QUANDO** confirmo a reserva
  - **ENTÃO** o status do quarto deve mudar para "Ocupado"
  - **E** a reserva deve aparecer na lista de reservas ativas.

- **Cenário 2: Tentativa de reservar quarto ocupado**
  - **DADO QUE** um quarto está com status "Ocupado"
  - **QUANDO** tento criar uma nova reserva para este quarto no mesmo período
  - **ENTÃO** o sistema deve bloquear a ação e informar "Quarto indisponível".

### HU08 - Visualizar Reservas
*Requisitos Relacionados: RF05.1, RF05.2, RF05.3*
**Como** Recepcionista,
**Eu quero** ver uma lista das reservas ativas com detalhes do quarto e do hóspede,
**Para que** eu possa ter um controle geral da ocupação do hotel.

**Critérios de Aceitação:**
- **Cenário 1: Detalhes na listagem**
  - **QUANDO** acesso a lista de reservas
  - **ENTÃO** devo ver: Número do Quarto, Tipo do Quarto, Nome do Hóspede e Status (Chip).

### HU09 - Editar Reserva
*Requisitos Relacionados: RF05.4*
**Como** Recepcionista,
**Eu quero** editar uma reserva existente,
**Para que** eu possa realizar trocas de quarto ou ajustes necessários a pedido do hóspede ou por necessidade do hotel.

**Critérios de Aceitação:**
- **Cenário 1: Alterar hóspede**
  - **DADO QUE** tenho uma reserva ativa
  - **QUANDO** edito a reserva e altero o hóspede titular
  - **ENTÃO** a reserva deve ser atualizada com o novo nome na listagem.
