# Diagrama de Classes - Sistema de Reserva de Hotel

Este documento representa as classes de domínio, seus atributos e relacionamentos.

## Código PlantUML

```plantuml
@startuml
!theme plain
hide empty members

class Quarto {
    - id : UUID
    - numero : String
    - capacidade : Integer
    - tipo : TipoQuarto
    - precoDiaria : Decimal
    - disponivel : Boolean
    - status : StatusQuarto
    + getComodidades() : List<Comodidade>
    + getCamas() : List<Cama>
}

class Hospede {
    - id : UUID
    - nome : String
    - sobrenome : String
    - cpf : String
    - email : String
    + getNomeCompleto() : String
}

class Reserva {
    - id : UUID
    - dataCheckIn : DateTime
    - dataCheckOut : DateTime
    - status : StatusReserva
    - valorTotal : Decimal
    + calcularValorTotal() : Decimal
}

class Cama {
    - id : UUID
    - tipo : TipoCama
}

class Comodidade {
    - id : UUID
    - nome : String
    - descricao : String
}

enum TipoQuarto {
    BASICO
    MODERNO
    LUXO
}

enum StatusQuarto {
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

enum StatusReserva {
    CONFIRMADA
    PENDENTE
    CANCELADA
    CHECKED_IN
    CHECKED_OUT
}

' Relacionamentos
Quarto "1" *-- "1..*" Cama : possui >
Quarto "1" *-- "0..*" Comodidade : possui >
reserva "0..*" --> "1" Hospede : realizada por >
reserva "0..*" --> "1" Quarto : referente a > 

hospede "1" -- "0..*" reserva : possui >

@enduml
```

## Descrição das Classes

1.  **Quarto**: Entidade central que representa a unidade de alojamento. Possui atributos descritivos e relacionamentos com Camas e Comodidades.
2.  **Hóspede**: Representa o cliente que realiza a reserva. O CPF é o identificador único de negócio.
3.  **Reserva**: Associação entre um Hóspede e um Quarto por um período de tempo definido (CheckIn/CheckOut).
4.  **Cama / Comodidade**: Entidades auxiliares (Value Objects ou Entidades fracas) que compõem as características do Quarto.
5.  **Enums**: `TipoQuarto`, `StatusQuarto`, `TipoCama` e `StatusReserva` normalizam os valores possíveis para atributos de domínio.
