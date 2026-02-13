# Estimativa de Esforço (Story Points)

As estimativas utilizam a sequência de Fibonacci (1, 2, 3, 5, 8, 13) para representar a complexidade e incerteza de cada funcionalidade.

## Gestão de Hóspedes
| Item | Story Points | Justificativa |
| :--- | :---: | :--- |
| CRUD Backend (Hóspedes) | 3 | Lógica simples, repetindo padrão de quartos. |
| UI Listagem e Cadastro | 5 | Requer criação de novos componentes e validação de CPF. |
| Testes Unitários | 2 | Foco em validação de dados de entrada. |

## Gestão de Reservas
| Item | Story Points | Justificativa |
| :--- | :---: | :--- |
| Orquestrador de Reservas (Backend) | 8 | Lógica complexa de disponibilidade e concorrência. |
| UI Fluxo de Reserva | 8 | Fluxo em múltiplas etapas (selecionar hóspede -> quarto -> data). |
| Atualização Automática de Status | 3 | Integração entre domínios (Integration Service). |

## Interface e UX
| Item | Story Points | Justificativa |
| :--- | :---: | :--- |
| Dashboard de Disponibilidade | 5 | Visualização gráfica via Chips e estados. |
| Refatoração UI/UX Final | 3 | Ajustes de consistência visual (Verde/Azul). |

## Infraestrutura
| Item | Story Points | Justificativa |
| :--- | :---: | :--- |
| Dockerização completa | 5 | Configuração de redes e multi-stage builds. |
| Setup CI/CD | 5 | Automação de testes e deploy. |

**Total Estimado**: 52 Story Points.
**Capacidade Estimada da Equipe**: 13-15 SP por Sprint.
