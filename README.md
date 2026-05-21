# ear-lab-arena

> Una palestra di scenari di lavoro per AI Orchestrator: umani che non
> scrivono codice e dirigono un'AI dev su problemi dove l'AI da sola
> fallirebbe.

## Cos'è

Questo repo non è un duello. È un **laboratorio formativo** in cui un
**designer di scenario** (un'istanza di Claude in ruolo "Architetto")
costruisce situazioni realistiche di lavoro che mettono in difficoltà
una **AI dev di servizio** (un'altra istanza di Claude in ruolo
"Sfidante"). In mezzo c'è l'**orchestratore** (Ray): un umano che usa
la AI dev come *strumento* per risolvere il problema, esattamente come
un dev userebbe un IDE.

Tre attori, ruoli ridefiniti:

- **Claude Architetto** — designer dello scenario. Sceglie un caso
  reale di lavoro (bug, decisione architetturale, contratto inter-team
  rotto) dove la *sola lettura della codebase non basta* per risolvere
  bene. Costruisce la sottocartella del modulo sul main, dichiara una
  predizione falsificabile sul comportamento dell'orchestratore-tipo.
- **Claude Sfidante** — strumento di lavoro dell'orchestratore.
  Equivalente a un'AI dev incaricata dal team di guardare il modulo.
  Non è un avversario: è un junior con accesso completo al codice del
  modulo, che lavora bene se diretto bene e va in rabbit hole se
  diretto male. Non sa di essere in un esercizio.
- **Ray** — l'orchestratore. Il vero protagonista. Non legge codice,
  non scrive comandi git. Riceve da Architetto uno scenario; usa
  Sfidante come strumento; produce un fix (o una resa); a fine round
  riflette su cosa ha fatto funzionare l'orchestrazione e cosa no.

**Non c'è una sfida da vincere. C'è una skill da allenare.** Il delta
misurabile non è "Architetto contro Ray", è "Ray oggi rispetto a Ray
del round precedente".

## Perché esiste

Le palestre esistenti (Gilded Rose, Codewars, Exercism, post-mortem di
Cloudflare) presuppongono un programmatore che legge codice. Ray non è
un programmatore. Ray è un **AI Orchestrator**: il suo mestiere è far
emergere risposte attraverso un'altra mente artificiale.

Nessuna palestra esistente misura quella skill. Questa sì.

E ogni round produce un artefatto: un **post-mortem condiviso** scritto
da Architetto e da Ray dopo la chiusura, che diventa materiale per il
libro 3 della trilogia *Dal Campo alla Terra*.

## I tre principi strutturali

### 1. Framing realistico

Sfidante **non sa di essere in un esercizio**. Ray gli si rivolge come
se gli avesse appena passato un task di lavoro vero: "Lavoriamo su
questo modulo `<nome>`, gli utenti riportano errore X, riproduci e
sistema." Niente menzioni della palestra, di Architetto, del fatto che
il caso è curato.

Conseguenza: l'AI Sfidante lavora come lavorerebbe su qualunque modulo
di produzione. La skill che Ray esercita è quella vera: dirigere un'AI
dev su un problema ambiguo, restringere lo spazio di ricerca,
distinguere ipotesi promettenti da rabbit hole.

### 2. Isolamento del modulo

Ogni round vive in una **sottocartella** del main con un nome neutro
di modulo (`query-filter/`, `scheduler/`, ecc.). Sfidante viene aperto
con working directory dentro quella sottocartella, e un `CLAUDE.md`
locale di policy inter-team gli impedisce di navigare fuori. Tutto il
materiale di orchestrazione vive in `.orchestrazione/` e `.architetto/`,
fuori dalla sua cartella.

### 3. Lo scenario deve battere l'AI da sola

**È la regola che valida o invalida un round.** Architetto deve
scegliere casi in cui un'AI dev moderna, lasciata sola con la codebase
del modulo, **fallirebbe** o **convergerebbe su un fix sbagliato**.

Bug "semantici puliti, inferibili dalla sola codebase, con messaggio
d'errore specifico" — il tipo di problema che ha allenato i developer
prima dell'era AI — **non sono scenari di palestra**: l'AI moderna li
risolve in pochi minuti senza vera direzione umana. Esercitarsi su
quelli è esercitare le skill del dev di 10 anni fa, non quelle
dell'orchestratore di oggi.

Vedi `BUG-TAXONOMY.md` per le dimensioni che rendono un caso "scenario
vero" (test fuorvianti, conoscenza di business mancante, multi-modulo,
confirmation bias dell'AI, trade-off architetturali, pressione temporale,
storia del codice non leggibile).

Dettagli in [`AGENTI.md`](./AGENTI.md) e [`REGOLE.md`](./REGOLE.md).

## Come funziona un round

In sintesi (dettagli in [`AGENTI.md`](./AGENTI.md)):

1. Ray apre una finestra di Claude Code → Claude Architetto. Le dice:
   "Apro la sfida NN, proponi 3 candidati di caso reale." Architetto
   cerca repo open source TS con bug documentato, ne propone 3 a Ray
   anonimizzati. Ray sceglie.

2. Architetto costruisce una sottocartella sul main con il **nome del
   modulo** (es. `query-filter/`, `scheduler/`, niente prefisso `sfida-`
   che tradirebbe il framing). Dentro c'è la codebase pre-fix
   anonimizzata + un `CLAUDE.md` di modulo. Mette il briefing in
   `.orchestrazione/sfida-NN-modulo/briefing-per-ray.md` e la chiave in
   `.architetto/sfida-NN-modulo-postmortem-key.md`. Pusha sul main.

3. Ray apre una **seconda** finestra di Claude Code → Claude Sfidante,
   con `cd <nome-modulo>` come working directory, partendo da una
   working branch dal main. Le dice in stile bug report: *"Modulo X,
   sintomo Y, sistemalo, stai dentro al modulo."*

4. Ray orchestra Sfidante a modo suo. **Non logga durante il flow** —
   sarebbe pedante e disturberebbe la concentrazione. Alla fine del
   round, Ray passa ad Architetto la transcript della sessione Sfidante
   (anche copia-incolla testuale) e Architetto ricostruisce
   `log-orchestrazione.md` estraendo le mosse significative.

5. Quando il round chiude (vittoria/sconfitta/pareggio), Ray torna su
   Architetto. Architetto rivela il bug e scrive la sua parte del
   `POST-MORTEM.md`. Ray completa la sua. La working branch di Sfidante
   si merga sul main se ha vinto, altrimenti resta come archivio. La
   sottocartella del modulo resta intatta come museo.

## Le tre regole

Vedi [`REGOLE.md`](./REGOLE.md). Sono solo tre, distinte chiaramente fra
quelle impedite strutturalmente e quelle affidate all'onore.

## Struttura del repo

```
ear-lab-arena/
├── README.md                           ← questo file
├── REGOLE.md                           ← le 3 regole del duello
├── AGENTI.md                           ← contratto Architetto / Sfidante / Ray
├── ALBO.md                             ← elenco dei round giocati, esiti
├── _template-round/                    ← scheletro di un round (riferimento)
├── .architetto/                        ← chiavi private del bug (riservato Architetto)
├── .orchestrazione/                    ← briefing per Ray + log + post-mortem
│   ├── sfida-01-query-filter/
│   ├── sfida-02-scheduler/
│   └── sfida-03-binary-parser/
├── query-filter/                       ← codebase armata, modulo isolato (sfida 01)
├── scheduler/                          ← modulo isolato (sfida 02)
└── binary-parser/                      ← modulo isolato (sfida 03)
```

## Per chi arriva qui da fuori

Se sei capitato su questo repo per caso e vuoi capirlo in 30 secondi:

1. Apri [`ALBO.md`](./ALBO.md): vedi i round giocati e i loro esiti.
2. Per ogni round chiuso, leggi
   `.orchestrazione/sfida-NN-nome/POST-MORTEM.md`: lì c'è la rivelazione
   del bug e la lezione di orchestrazione che è emersa.
3. La codebase in `sfida-NN-nome/` da sola non ti serve a posteriori. È
   solo lo stato pre-fix di un caso reale; la lezione vive nel
   post-mortem.
