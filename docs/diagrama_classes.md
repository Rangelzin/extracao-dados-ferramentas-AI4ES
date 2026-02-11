# Diagrama de Classes Principal

Este diagrama representa as entidades de domínio e seus relacionamentos no sistema de reservas.

```plantuml
@startuml
enum TipoQuarto {
  BASICO
  MODERNO
  LUXO
}

enum StatusDisponibilidade {
  LIVRE
  OCUPADO
  MANUTENCAO
  LIMPEZA
}

enum TipoCama {
  SOLTEIRO
  CASAL_KING
  CASAL_QUEEN
}

class Quarto {
  - numero: String
  - capacidade: Integer
  - tipo: TipoQuarto
  - precoDiaria: Double
  - temFrigobar: Boolean
  - temCafeIncluso: Boolean
  - temArCondicionado: Boolean
  - temTV: Boolean
  - status: StatusDisponibilidade
}

class Cama {
  - tipo: TipoCama
}

class Hospede {
  - nome: String
  - sobrenome: String
  - cpf: String
  - email: String
}

class Reserva {
  - id: UUID
  - dataInicio: DateTime
  - dataFim: DateTime
  - status: String
  + totalPreco(): Double
}

' Relacionamentos
Quarto "1" *-- "1..*" Cama : contém
Reserva "n" -- "1" Quarto : aloca
Reserva "n" -- "1" Hospede : pertence a
@enduml
```

## Detalhes das Entidades
- **Quarto**: Agrega as características físicas e o estado operacional (disponibilidade).
- **Cama**: Entidade vinculada ao Quarto para definir a configuração de dormitório.
- **Hóspede**: Entidade central para identificação do cliente.
- **Reserva**: Gerencia o vínculo temporal entre o cliente e o patrimônio do hotel (quarto).
