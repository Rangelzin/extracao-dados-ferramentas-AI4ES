# Casos de Uso Principais

## Caso de Uso 1: Cadastro de Quartos
- **Ator**: Administrador
- **Pré-condições**:
  - O administrador deve estar autenticado no sistema.
  - O sistema deve estar operacional.
- **Descrição**:
  - O administrador acessa a página de cadastro de quartos.
  - Preenche os campos obrigatórios com as informações do quarto.
  - Clica no botão "Salvar".
- **Pós-condições**:
  - O quarto é salvo no sistema.
  - O quarto aparece na lista de quartos cadastrados.

## Caso de Uso 2: Listagem de Quartos
- **Ator**: Administrador
- **Pré-condições**:
  - O administrador deve estar autenticado no sistema.
  - Devem existir quartos cadastrados no sistema.
- **Descrição**:
  - O administrador acessa a página de listagem de quartos.
  - Visualiza as informações principais de cada quarto em uma tabela.
- **Pós-condições**:
  - O administrador consegue visualizar todos os quartos cadastrados.

## Caso de Uso 3: Cadastro de Hóspedes
- **Ator**: Recepcionista
- **Pré-condições**:
  - O recepcionista deve estar autenticado no sistema.
  - O sistema deve estar operacional.
- **Descrição**:
  - O recepcionista acessa a página de cadastro de hóspedes.
  - Preenche os campos obrigatórios com as informações do hóspede.
  - Clica no botão "Salvar".
- **Pós-condições**:
  - O hóspede é salvo no sistema.
  - O hóspede aparece na lista de hóspedes cadastrados.

## Caso de Uso 4: Listagem de Reservas
- **Ator**: Recepcionista
- **Pré-condições**:
  - O recepcionista deve estar autenticado no sistema.
  - Devem existir reservas cadastradas no sistema.
- **Descrição**:
  - O recepcionista acessa a página de listagem de reservas.
  - Visualiza as informações principais de cada reserva em uma tabela.
- **Pós-condições**:
  - O recepcionista consegue visualizar todas as reservas cadastradas.

## Caso de Uso 5: Autenticação
- **Ator**: Administrador, Recepcionista
- **Pré-condições**:
  - O sistema deve estar operacional.
- **Descrição**:
  - O usuário acessa a página de login.
  - Insere suas credenciais (usuário e senha).
  - Clica no botão "Entrar".
- **Pós-condições**:
  - O usuário é autenticado e redirecionado para a página inicial do sistema.
  - O sistema registra o acesso do usuário.