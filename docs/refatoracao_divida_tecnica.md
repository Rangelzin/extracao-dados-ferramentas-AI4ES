# Redução de Dívida Técnica - Refatoração do QuartoService

Este documento explica como as alterações realizadas no `QuartoService` contribuem para a redução da dívida técnica e aumento da qualidade do software.

## Problema Original
O código anterior possuía **duplicação de lógica** (violação do princípio DRY - *Don't Repeat Yourself*). A regra de negócio "transformar uma lista de tipos e quantidades de camas em entidades individuais com IDs únicos" estava implementada de duas formas diferentes:
1.  `cadastrarQuarto`: Usava um loop `forEach` imperativo com `push`.
2.  `editarQuarto`: Usava `flatMap` funcional.

## Solução Aplicada
Centralizamos essa lógica no método privado `gerarCamas`.

## Benefícios (Redução de Dívida)

### 1. Manutenibilidade (Single Point of Truth)
*   **Antes**: Se a regra mudasse (ex: camas agora precisam de um status inicial "LIMPA"), você teria que alterar o código em **dois lugares** diferentes. O risco de esquecer um deles e gerar inconsistência era alto.
*   **Agora**: A alteração é feita apenas no método `gerarCamas`. Isso é o princípio do "Ponto Único da Verdade".

### 2. Legibilidade (Cognitive Load)
*   **Antes**: Quem lia o método `cadastrarQuarto` precisava "parsear" mentalmente o loop `for` para entender que ele estava apenas criando objetos.
*   **Agora**: A chamada `this.gerarCamas(input.camas)` é declarativa. O leitor entende **o que** está sendo feito sem precisar analisar **como** está sendo feito. Isso reduz a carga cognitiva.

### 3. Redução de Testes Fragéis
*   **Antes**: Testes teriam que cobrir a lógica de criação de camas duplicada em ambos os métodos principais.
*   **Agora**: A consistência do comportamento é garantida pela implementação única. Se o helper funciona, ele funciona para todos os consumidores.

### 4. Preparação para Evolução
*   Ao desacoplar a "criação de camas" do "fluxo de cadastro", facilitamos mudanças futuras. Por exemplo, se decidirmos mover essa lógica para uma *Factory* no Domínio (`CamaFactory`), a refatoração será trivial, pois o acoplamento já foi isolado no método privado.
