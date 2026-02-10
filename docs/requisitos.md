# Documento de Requisitos - Sistema de Reserva de Hotel

Este documento descreve os Requisitos Funcionais (RF) e Não Funcionais (RNF) do sistema de gestão de reservas para um hotel, classificados segundo a metodologia **MoSCoW**:
- **Must Have:** Deve ter (Crítico)
- **Should Have:** Deveria ter (Importante)
- **Could Have:** Poderia ter (Desejável)
- **Won't Have:** Não terá (Ficará para depois)

## Requisitos Funcionais (RF)

### RF01 - Gestão de Quartos
| ID | Descrição | Prioridade |
|---|---|---|
| RF01.1 | Cadastro de quartos (Número, Capacidade, Preço, Comodidades) | **Must Have** |
| RF01.2 | Edição de quartos | **Must Have** |
| RF01.3 | Seleção de Tipo de Quarto (Básico, Moderno, Luxo) | **Must Have** |
| RF01.4 | Cadastro de Camas (Lista e Tipo) | **Must Have** |

### RF02 - Listagem de Quartos
| ID | Descrição | Prioridade |
|---|---|---|
| RF02.1 | Listar Quartos (Número, Tipo, Preço, Disponibilidade) | **Must Have** |
| RF02.2 | Alterar Disponibilidade (Ocupado, Livre, Manutenção, Limpeza) | **Must Have** |
| RF02.3 | Botão de Edição na listagem | **Must Have** |

### RF03 - Gestão de Hóspedes
| ID | Descrição | Prioridade |
|---|---|---|
| RF03.1 | Cadastro de Hóspedes (Nome, Sobrenome, CPF, Email) | **Must Have** |
| RF03.2 | Validação básica de campos (CPF, Email) | **Should Have** |

### RF04 - Listagem de Hóspedes
| ID | Descrição | Prioridade |
|---|---|---|
| RF04.1 | Listar Hóspedes (Nome, Sobrenome, CPF) | **Must Have** |
| RF04.2 | Ocultar Email na listagem | **Must Have** |

### RF05 - Gestão de Reservas
| ID | Descrição | Prioridade |
|---|---|---|
| RF05.1 | Listar Quartos com status de reserva | **Must Have** |
| RF05.2 | Exibir Nome do Hóspede na reserva | **Must Have** |
| RF05.3 | Exibir Disponibilidade com Chip/Badge | **Must Have** |
| RF05.4 | Botão de Edição da reserva | **Must Have** |

---

## Requisitos Não Funcionais (RNF)

### RNF01 - Interface de Usuário
| ID | Descrição | Prioridade |
|---|---|---|
| RNF01.1 | Interface Web Moderna e Responsiva | **Must Have** |
| RNF01.2 | Paleta de Cores: Verde e Azul | **Must Have** |
| RNF01.3 | Componentes Visuais Modernos | **Must Have** |

### RNF02 - Usabilidade
| ID | Descrição | Prioridade |
|---|---|---|
| RNF02.1 | Fluxo de navegação intuitivo | **Should Have** |
| RNF02.2 | Adaptação a dispositivos móveis | **Should Have** |

### RNF03 - Desempenho
| ID | Descrição | Prioridade |
|---|---|---|
| RNF03.1 | Tempo de resposta rápido (< 2s) | **Should Have** |

### RNF04 - Segurança
| ID | Descrição | Prioridade |
|---|---|---|
| RNF04.1 | Proteção de dados sensíveis (CPF) | **Must Have** |

### RNF05 - Manutenibilidade
| ID | Descrição | Prioridade |
|---|---|---|
| RNF05.1 | Código organizado e documentado | **Should Have** |
