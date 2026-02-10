# Etapa 1 - Engenharia de Requisitos

## 1. Definição do Domínio e Contexto

**User:**
Você é um Engenheiro de Software e deve considerar o seguinte domínio de aplicação:

Um sistema de reserva, para um único hotel. Este sistema é composto por alguns módulos e regras de negócios, a saber:

* **Gestão de quartos:**
    * **Cadastro de quarto:**
        * Número do quarto (Input)
        * Capacidade (Input)
        * Tipo do quarto (Básico, Moderno, Luxo) (Select)
        * Preço por diária (Input)
        * Há Frigobar (Checkbox)
        * Há café da manhã incluso (Checkbox)
        * Há Ar-condicionado (Checkbox)
        * Há TV (Checkbox)
        * Uma sessão "Camas".
    * **Lista dos quartos:**
        * Número do quarto (Número)
        * Tipo do quarto (Texto)
        * Preço por diária (Número)
        * Disponibilidade (Ocupado, Livre, Manutenção e Limpeza) (Select)
        * Botão para editar o quarto (ícone de lápis) (Botão)

* **Gestão de Hospedes:**
    * Tipo de cama (Solteiro, Casal King, Casal Queen) (Select)
    * **Cadastro de hóspede:**
        * Nome (Input)
        * Sobrenome (Input)
        * CPF (Input)
        * Email (Input)
    * **Lista de hóspedes:** contendo todos os 3 campos, exceto e-mail.

* **Gestão de reserva:**
    * **Lista de quartos:**
        * Número do quarto (Número)
        * Tipo do quarto (Texto)
        * Nome do Hospede (Texto)
        * Disponibilidade (Ocupado, Livre, Manutenção e Limpeza) (Chip)
        * Botão para editar a reserva (ícone de lápis) (Botão)

O sistema terá interface web, com paleta de cores verde e azul e utilizará componentes modernos.

Você compreende o conteúdo apresentado em PT-BR?

Além disso, TODO E QUALQUER ARTEFATO Q VOCÊ GERAR QUERO UM ARQUIVO .Md na pasta docs na pasta raiz, e ao final de cada etapa a qual irei comunicar gostaria q vc transcreve-se a nossa conversa para a pasta raiz com nome "etapa-[numero].md". Na pasta raiz já contem as pastas code docs e @.gitignore.

Aguarde para inicio de cada etapa, compreendido?

**GitHub Copilot:**
Sim, compreendido! Estou pronto para iniciar a execução das etapas conforme solicitado. Aguardo suas instruções para começar.

---

## 2. Levantamento de Requisitos (RF e RNF)

**User:**
Etapa 1 Iniciando....
Lembre, gostaria q gera-se documentação em markedown .md na pasta /docs
Liste requisitos funcionais (RF) e não funcionais (RNF) para este sistema.

**GitHub Copilot:**
### Requisitos Funcionais (RF)

1.  **Gestão de Quartos**:
    * Cadastro de quartos com os seguintes campos:
        * Número do quarto.
        * Capacidade.
        * Tipo do quarto (Básico, Moderno, Luxo).
        * Preço por diária.
        * Há frigobar (sim/não).
        * Há café da manhã incluso (sim/não).
        * Há ar-condicionado (sim/não).
        * Há TV (sim/não).
        * Sessão "Camas" com tipo de cama (Solteiro, Casal King, Casal Queen).
    * Listagem de quartos com as colunas:
        * Número do quarto.
        * Tipo do quarto.
        * Preço por diária.
        * Disponibilidade (Ocupado, Livre, Manutenção e Limpeza).
        * Botão para editar o quarto.

2.  **Gestão de Hóspedes**:
    * Cadastro de hóspedes com os seguintes campos:
        * Nome.
        * Sobrenome.
        * CPF.
        * Email.
    * Listagem de hóspedes com as colunas:
        * Nome.
        * Sobrenome.
        * CPF.

3.  **Gestão de Reservas**:
    * Listagem de reservas com as colunas:
        * Número do quarto.
        * Tipo do quarto.
        * Nome do hóspede.
        * Disponibilidade (Ocupado, Livre, Manutenção e Limpeza).
        * Botão para editar a reserva.

4.  **Interface Web**:
    * Interface moderna com paleta de cores verde e azul.
    * Utilização de componentes modernos.

### Requisitos Não Funcionais (RNF)

1.  **Desempenho**:
    * O sistema deve ser capaz de suportar até 100 usuários simultâneos.

2.  **Segurança**:
    * Dados sensíveis, como CPF e email, devem ser armazenados de forma segura.
    * O sistema deve implementar autenticação para acesso às funcionalidades.

3.  **Usabilidade**:
    * Interface intuitiva e responsiva para diferentes dispositivos.

4.  **Manutenibilidade**:
    * O código deve ser modular e seguir boas práticas de desenvolvimento.

5.  **Compatibilidade**:
    * O sistema deve ser compatível com os navegadores mais utilizados (Chrome, Firefox, Edge).

6.  **Disponibilidade**:
    * O sistema deve estar disponível 99,9% do tempo.

*Ação: Os requisitos funcionais e não funcionais foram listados e documentados no arquivo Markdown na pasta docs com o nome `requisitos.md`.*

---

## 3. Priorização de Requisitos (MoSCoW)

**User:**
Classifique-os por prioridade (MoSCoW).

**GitHub Copilot:**
### Classificação MoSCoW dos Requisitos

#### **Must Have (Obrigatórios)**
* **Gestão de Quartos**:
    * Cadastro de quartos com todos os campos especificados.
    * Listagem de quartos com as colunas especificadas.
* **Gestão de Hóspedes**:
    * Cadastro de hóspedes com todos os campos especificados.
    * Listagem de hóspedes com as colunas especificadas.
* **Gestão de Reservas**:
    * Listagem de reservas com as colunas especificadas.
* **Segurança**:
    * Dados sensíveis, como CPF e email, devem ser armazenados de forma segura.
    * O sistema deve implementar autenticação para acesso às funcionalidades.

#### **Should Have (Importantes)**
* **Interface Web**:
    * Interface moderna com paleta de cores verde e azul.
    * Utilização de componentes modernos.
* **Usabilidade**:
    * Interface intuitiva e responsiva para diferentes dispositivos.
* **Compatibilidade**:
    * O sistema deve ser compatível com os navegadores mais utilizados (Chrome, Firefox, Edge).

#### **Could Have (Desejáveis)**
* **Desempenho**:
    * O sistema deve ser capaz de suportar até 100 usuários simultâneos.
* **Manutenibilidade**:
    * O código deve ser modular e seguir boas práticas de desenvolvimento.

#### **Won’t Have (Não serão implementados agora)**
* **Disponibilidade**:
    * O sistema deve estar disponível 99,9% do tempo.

*Ação: Os requisitos foram classificados utilizando a metodologia MoSCoW e a documentação foi atualizada no arquivo `requisitos.md`.*

---

## 4. Histórias de Usuário

**User:**
Crie as histórias de usuário no formato padrão (Como [tipo de usuário], eu quero…, para que…).
crie um novo arquivo

**GitHub Copilot:**
*Ação: O arquivo `docs/historias_usuario.md` foi criado.*

As histórias de usuário foram criadas e salvas no arquivo `historias_usuario.md` na pasta docs. A etapa está concluída. Aguardo as próximas instruções.

---

## 5. Critérios de Aceitação

**User:**
Inclua critérios de aceitação no formato padrão (Given-When-Then).

**GitHub Copilot:**
*Ação: Atualização do arquivo com critérios de aceitação.*

Os critérios de aceitação foram adicionados às histórias de usuário no formato Given-When-Then e o arquivo foi atualizado. A etapa está concluída. Aguardo as próximas instruções.

---

## 6. Casos de Uso

**User:**
Defina os casos de uso principais com atores, pré-condições e pós-condições. crie um novo arquivo para tal

**GitHub Copilot:**
*Ação: O arquivo `docs/casos_uso.md` foi criado.*

Os casos de uso principais foram definidos com atores, pré-condições e pós-condições, e salvos no arquivo `casos_uso.md` na pasta docs. A etapa está concluída. Aguardo as próximas instruções.

---

## 7. Rastreabilidade de Requisitos

**User:**
Vincule requisitos às histórias de usuário correspondentes. Matenha tudo q fez anteriormente

**GitHub Copilot:**
*Ação: Atualização dos arquivos existentes para vincular requisitos.*

Os requisitos foram vinculados às histórias de usuário correspondentes e os arquivos foram atualizados mantendo todo o conteúdo existente. A etapa está concluída. Aguardo as próximas instruções.