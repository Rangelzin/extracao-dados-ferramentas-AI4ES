# Histórias de Usuário - Sistema de Reserva de Hotel

Este documento descreve as funcionalidades do sistema sob a perspectiva dos usuários finais.

## 1. Gestão de Quartos (Admin/Recepcionista)

- **US01**: Como administrador, eu quero cadastrar quartos informando número, capacidade, tipo, preço e amenidades (frigobar, AC, etc), para manter o inventário do hotel atualizado.
    - **Critério de Aceitação**: 
        - **Dado** que o administrador está na tela de cadastro de quarto;
        - **Quando** preencher todos os campos obrigatórios e clicar em "Salvar";
        - **Então** o sistema deve validar os dados e exibir uma mensagem de sucesso, adicionando o quarto à lista.

- **US02**: Como recepcionista, eu quero visualizar uma lista de quartos com seus respectivos preços e tipos, para informar rapidamente os hóspedes sobre as opções disponíveis.
    - **Critério de Aceitação**:
        - **Dado** que existem quartos cadastrados;
        - **Quando** a recepcionista acessar a lista de quartos;
        - **Então** o sistema deve exibir colunas com Número, Tipo e Preço por diária.

- **US03**: Como administrador, eu quero alterar o status de um quarto (Livre, Ocupado, Manutenção, Limpeza), para que a equipe saiba quais unidades estão prontas para uso.
    - **Critério de Aceitação**:
        - **Dado** que um quarto está listado;
        - **Quando** o usuário alterar o valor no seletor de disponibilidade;
        - **Então** o sistema deve atualizar o status imediatamente no banco de dados.

## 2. Gestão de Hóspedes (Recepcionista)

- **US04**: Como recepcionista, eu quero cadastrar novos hóspedes com CPF, Nome e E-mail, para manter o banco de dados de clientes atualizado.
    - **Critério de Aceitação**:
        - **Dado** o formulário de cadastro de hóspedes;
        - **Quando** um CPF válido for inserido junto aos demais dados;
        - **Então** o sistema deve salvar o hóspede e permitir sua visualização na lista.

- **US05**: Como recepcionista, eu quero consultar a lista de hóspedes cadastrados, para agilizar o processo de check-in de clientes recorrentes.
    - **Critério de Aceitação**:
        - **Dado** a tela de listagem de hóspedes;
        - **Quando** a página carregar;
        - **Então** o sistema deve exibir Nome, Sobrenome e CPF de todos os cadastrados.

## 3. Gestão de Reservas (Recepcionista)

- **US06**: Como recepcionista, eu quero visualizar quem é o hóspede alocado em cada quarto na lista de reservas, para prestar um atendimento personalizado.
    - **Critério de Aceitação**:
        - **Dado** a lista de reservas;
        - **Quando** um quarto estiver ocupado;
        - **Então** o nome do hóspede deve estar visível ao lado do número do quarto.

- **US07**: Como recepcionista, eu quero editar uma reserva existente através de um ícone de fácil acesso, para corrigir dados ou atualizar informações de estadia.
    - **Critério de Aceitação**:
        - **Dado** uma reserva na lista;
        - **Quando** o ícone de lápis for clicado;
        - **Então** o sistema deve abrir um formulário com os dados atuais da reserva para edição.

## 4. Interface (Usuário Geral)

- **US08**: Como usuário do sistema, eu quero utilizar uma interface moderna com as cores azul e verde, para ter uma experiência de uso agradável e intuitiva.
    - **Critério de Aceitação**:
        - **Dado** qualquer tela do sistema;
        - **Então** os elementos visuais devem seguir a paleta verde/azul e utilizar componentes modernos.

- **US09**: Como usuário do sistema, eu quero visualizar o status de disponibilidade através de Chips coloridos, para identificar o estado do hotel de forma imediata.
    - **Critério de Aceitação**:
        - **Dado** a coluna de disponibilidade;
        - **Então** o status deve ser exibido dentro de um componente "Chip" com cores distintas para cada estado (ex: Verde para Livre, Vermelho para Ocupado).
