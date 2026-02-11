# Priorização de Requisitos (MoSCoW)

Este documento classifica os requisitos do sistema de reserva de hotel por ordem de importância para o negócio.

## 1. Must Have (Tem que ter)
*Requisitos críticos para a operação básica do sistema.*

- **RF01 - Cadastro de Quartos**: Sem o cadastro, não há itens para reservar.
- **RF02 - Status de Disponibilidade**: Essencial para evitar reservas duplicadas (Overbooking).
- **RF03 - Cadastro de Hóspedes**: Necessário para identificar quem está realizando a reserva.
- **RF05 - Gestão de Reservas**: O core business do sistema.
- **RNF04 - Estrutura de Pastas**: Organização básica solicitada.

## 2. Should Have (Deveria ter)
- **RF06 - Edição de Dados**: Importante para correções, mas o sistema funciona inicialmente apenas com criação/listagem.
- **RF04 - Lista de Hóspedes**: Facilita a gestão, mas não impede o fluxo de reserva.
- **RNF03 - Componentes Modernos**: Importante para a experiência do usuário (UX) conforme o briefing.

## 3. Could Have (Poderia ter)
- Filtros de busca na listagem de quartos.
- Dashboard simplificado de ocupação.

## 4. Won't Have (Não terá por enquanto)
- Sistema de login/permissões (não especificado).
- Pagamento online.
- Multi-hotel.
