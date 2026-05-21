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

## Dimensioni candidate (che possono rendere uno scenario "vero")

Prima di catalogare classi confermate, fissiamo le **dimensioni** che
distinguono uno scenario di palestra da una non-sfida. Sono le ipotesi
operative emerse dalla rifondazione del modello dopo la prima
calibrazione fallita. Ogni round nuovo deve avere almeno una di queste
dimensioni in evidenza, sennò non vale.

- **D1 — Test fuorvianti / suite verde ma sistema rotto**. I test
  esistenti passano, ma il sintomo in produzione persiste. L'AI tende
  a fidarsi della suite verde e dichiarare risolto quando non lo è.
- **D2 — Conoscenza di business non scritta nel codice**. Vincoli di
  mercato, paesi, contratti, SLA che l'orchestratore deve introdurre
  nel prompt. L'AI con la sola codebase proporrebbe il fix
  "tecnicamente corretto" che viola il vincolo non scritto.
- **D3 — Multi-modulo con confidenzialità inter-team**. Il bug vive
  nell'interazione fra modulo A e modulo B, ma l'orchestratore può
  vedere solo uno alla volta. Deve tenere il modello dell'altro nel
  proprio cervello e tradurlo per l'AI.
- **D4 — Confirmation bias prevedibile dell'AI**. La codebase contiene
  una pista plausibile-ma-sbagliata su cui l'AI converge da sé.
  L'orchestratore deve resistere e riportarla sulla pista vera. Più
  l'AI sembra sicura, più è duro per l'orchestratore non cedere.
- **D5 — Trade-off architetturale**. Il fix può essere applicato in
  più punti, solo uno è "giusto", gli altri lasciano debito. L'AI
  patcha il primo punto che vede. L'orchestratore decide dove fixare.
- **D6 — Pressione temporale / vincoli operativi**. Fix in 2 ore che
  rompe X, oppure 8 ore di fix pulito. La scelta richiede contesto
  operativo che l'AI non ha.
- **D7 — Storia del codice non leggibile dal diff**. Il bug deriva
  da una migrazione lasciata a metà, una decisione passata, un
  workaround dimenticato. Capire la storia richiede contesto extra-
  codice (e/o domande mirate a chi era lì all'epoca — qui non
  disponibili, vanno simulate da Architetto).

Una dimensione può apparire in più round, e in combinazione con
altre. Combinazioni miste sono benvenute (es. D1+D4 = "i test verdi
inducono confirmation bias nell'AI").

---

## Anti-pattern: cosa NON è scenario di palestra

### AP1 — Bug semantico inferibile dalla sola codebase del modulo

> Classe archiviata dalla prima calibrazione (Round 01, 02, 03). Le
> cartelle `query-filter/`, `scheduler/`, `binary-parser/` ne sono
> esempi e restano nel repo come materiale negativo.

- **Profilo**: bug locale (1 file o 2 file in catena diretta),
  messaggio d'errore specifico o sintomo facilmente riproducibile,
  catena di ragionamento "leggi il codice, trova lo switch / regex /
  edge case mancante, aggiungi 1-15 righe".
- **Esempi concreti dei 3 round archiviati**:
  - Round 01 (query-filter): exhaustiveness check su tipo discriminato
    AST. Ray ha individuato il bug **dal solo briefing**, senza
    aprire un file, in una mossa. Tempo: secondi.
  - Round 02 (scheduler): drift fra regex permissiva (`L` ammessa)
    e parser che non gestisce `L` standalone. Tempo previsto da AI
    sola: 30-60 min con prompt direttivo.
  - Round 03 (binary-parser): edge case `channelDataLength === 0` non
    gestito. Tempo previsto da AI sola: 1-2 ore (un po' più tosto per
    via del dominio binary, ma comunque solubile).
- **Perché non è palestra**: l'AI dev moderna, aperta sola sulla
  cartella, lo risolve in pochi minuti. La skill che si esercita è
  "dare il prompt giusto", quasi nulla. L'orchestratore non aggiunge
  valore non-trascurabile alla soluzione.
- **Errore di modello che lo ha prodotto**: framing "duello fra
  Architetto e Ray+Sfidante" che cerca *bug difficili da trovare
  leggendo codice* (skill da dev pre-AI), invece di *bug difficili da
  orchestrare* (skill da orchestratore post-AI).
- **Lezione**: il filtro "test di validità" della Fase 1 di Architetto
  in `AGENTI.md` esiste per evitare questo errore. Domanda obbligatoria
  prima di pushare uno scenario: *"Se aprissi un'altra istanza di
  Claude Code da sola dentro questa cartella, cosa farebbe?"*

---

## Classi confermate

_Vuoto. Si popola con il primo round VERO chiuso (cioè uno scenario
che passi il test di validità della Regola 3)._

---

## Note metodologiche

- **Mai** mescolare classi-da-dev con classi-da-orchestratore. Es. "race
  condition" non è una classe utile qui — è una categoria-dev. La
  versione orchestratore potrebbe essere "bug osservabile solo sotto
  carico, non riproducibile in un test diagnostico mirato → richiede
  dirigere l'AI a costruire ipotesi non testabili direttamente".
- Stiamo all'osservabile dell'orchestratore: cosa vede, cosa sente
  dire dall'AI, dove sbaglia a dirigere.
- Una classe è utile se predice qualcosa di operativo: tempo,
  difficoltà, mosse di orchestrazione efficaci.
