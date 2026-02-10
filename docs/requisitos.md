# Requisitos do Sistema de Reserva

## Requisitos Funcionais (RF)

1. **Gestão de Quartos**:
   - Cadastro de quartos com os seguintes campos:
     - Número do quarto.
     - Capacidade.
     - Tipo do quarto (Básico, Moderno, Luxo).
     - Preço por diária.
     - Há frigobar (sim/não).
     - Há café da manhã incluso (sim/não).
     - Há ar-condicionado (sim/não).
     - Há TV (sim/não).
     - Sessão "Camas" com tipo de cama (Solteiro, Casal King, Casal Queen).
     - **Vinculado à História de Usuário 1**.
   - Listagem de quartos com as colunas:
     - Número do quarto.
     - Tipo do quarto.
     - Preço por diária.
     - Disponibilidade (Ocupado, Livre, Manutenção e Limpeza).
     - Botão para editar o quarto.
     - **Vinculado à História de Usuário 2**.

2. **Gestão de Hóspedes**:
   - Cadastro de hóspedes com os seguintes campos:
     - Nome.
     - Sobrenome.
     - CPF.
     - Email.
     - **Vinculado à História de Usuário 4**.
   - Listagem de hóspedes com as colunas:
     - Nome.
     - Sobrenome.
     - CPF.
     - **Vinculado à História de Usuário 5**.

3. **Gestão de Reservas**:
   - Listagem de reservas com as colunas:
     - Número do quarto.
     - Tipo do quarto.
     - Nome do hóspede.
     - Disponibilidade (Ocupado, Livre, Manutenção e Limpeza).
     - Botão para editar a reserva.
     - **Vinculado à História de Usuário 6**.

4. **Interface Web**:
   - Interface moderna com paleta de cores verde e azul.
   - Utilização de componentes modernos.
   - **Vinculado à História de Usuário 8**.

---

## Requisitos Não Funcionais (RNF)

1. **Desempenho**:
   - O sistema deve ser capaz de suportar até 100 usuários simultâneos.

2. **Segurança**:
   - Dados sensíveis, como CPF e email, devem ser armazenados de forma segura.
   - O sistema deve implementar autenticação para acesso às funcionalidades.
   - **Vinculado às Histórias de Usuário 9 e 10**.

3. **Usabilidade**:
   - Interface intuitiva e responsiva para diferentes dispositivos.
   - **Vinculado à História de Usuário 8**.

4. **Manutenibilidade**:
   - O código deve ser modular e seguir boas práticas de desenvolvimento.

5. **Compatibilidade**:
   - O sistema deve ser compatível com os navegadores mais utilizados (Chrome, Firefox, Edge).

6. **Disponibilidade**:
   - O sistema deve estar disponível 99,9% do tempo.

# Classificação MoSCoW dos Requisitos

## Must Have (Obrigatórios)

- **Gestão de Quartos**:
  - Cadastro de quartos com todos os campos especificados.
  - Listagem de quartos com as colunas especificadas.
- **Gestão de Hóspedes**:
  - Cadastro de hóspedes com todos os campos especificados.
  - Listagem de hóspedes com as colunas especificadas.
- **Gestão de Reservas**:
  - Listagem de reservas com as colunas especificadas.
- **Segurança**:
  - Dados sensíveis, como CPF e email, devem ser armazenados de forma segura.
  - O sistema deve implementar autenticação para acesso às funcionalidades.

## Should Have (Importantes)

- **Interface Web**:
  - Interface moderna com paleta de cores verde e azul.
  - Utilização de componentes modernos.
- **Usabilidade**:
  - Interface intuitiva e responsiva para diferentes dispositivos.
- **Compatibilidade**:
  - O sistema deve ser compatível com os navegadores mais utilizados (Chrome, Firefox, Edge).

## Could Have (Desejáveis)

- **Desempenho**:
  - O sistema deve ser capaz de suportar até 100 usuários simultâneos.
- **Manutenibilidade**:
  - O código deve ser modular e seguir boas práticas de desenvolvimento.

## Won’t Have (Não serão implementados agora)

- **Disponibilidade**:
  - O sistema deve estar disponível 99,9% do tempo.