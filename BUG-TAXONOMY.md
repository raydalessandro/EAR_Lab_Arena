# Tassonomia dei bug per orchestratori

> Documento vivo. Cresce round dopo round con i dati della palestra.

## Perché esiste

Le tassonomie esistenti dei bug sono state pensate **per i developer**:
race condition, off-by-one, null pointer dereference, type coercion,
classic data race, ecc. Sono categorie che derivano da come un dev
legge il codice e scrive il fix.

**Per un AI Orchestrator — un umano che non legge codice e lavora con
un'AI dev — il bug è caratterizzato da dimensioni completamente diverse**:

- Quanto è lontano il sintomo dal punto da fixare?
- L'AI ha tutto il contesto necessario in un colpo solo, o l'orchestratore
  deve dirigere il context?
- Quante piste plausibili-ma-sbagliate ci sono nella codebase, che
  rischiano di convincere l'AI?
- Il sintomo è osservabile lanciando i test, o serve costruire prima un
  test diagnostico?
- L'AI rischia di proporre fix sbagliati ma "plausibili" che passano i
  test esistenti?

Queste sono le dimensioni del **lavoro reale** di un orchestratore. Mai
formalizzate, mai indicizzate. La palestra `ear-lab-arena` raccoglie
dati per costruire la prima tassonomia indicizzata su queste dimensioni.

## Come si popola

Ogni round produce una voce. Architetto, durante la Fase 2.5 di
armamento (vedi `AGENTI.md`), assegna una **classe candidata** al bug
del round. A fine round, nel POST-MORTEM, Architetto + Ray confrontano
la classe candidata con la realtà osservata:

- **Se la classe esisteva e l'esperienza la conferma**: si aggiunge la
  voce sotto quella classe, arricchendola di un nuovo punto-dati.
- **Se la classe esisteva ma non si conferma**: si scrive la sfumatura
  o si propone una sotto-classe.
- **Se la classe era nuova**: si registra come definitiva.
- **Se la classe non esiste ancora**: si propone (Architetto), si verifica
  con dati di un secondo round (post-mortem).

Una classe diventa "stabile" dopo almeno 2 round indipendenti che la
confermano.

## Schema di una voce

```
### [Nome classe]

- **Caratteristica per orchestratore**: [cosa la rende distintiva]
- **Difficoltà tipica osservata**: [range 1-5, basato sui round]
- **Tempo tipico osservato**: [range orario, basato sui round]
- **Rabbit hole ricorrenti**: [pattern di dove l'orchestratore si perde]
- **Mosse di orchestrazione efficaci**: [cosa funziona quando si incontra]
- **Round che la confermano**: [lista NN]
- **Stato**: [candidata / stabile]
```

---

## Classi identificate

_Vuoto. Si popola con il primo round chiuso._

---

## Note metodologiche

- **Mai** mescolare classi-da-dev con classi-da-orchestratore. Es. "race
  condition" non è una classe utile qui — è una categoria-dev. La
  versione orchestratore potrebbe essere "bug osservabile solo sotto
  carico, non riproducibile in un test diagnostico mirato".
- Stiamo all'osservabile dell'orchestratore: cosa vede, cosa sente
  dire dall'AI, dove sbaglia a dirigere.
- Una classe è utile se predice qualcosa di operativo: tempo, difficoltà,
  mosse di orchestrazione efficaci.
