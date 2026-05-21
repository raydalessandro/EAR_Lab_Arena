# ear-lab-arena

> Una palestra di duelli asimmetrici fra due istanze di Claude Code
> orchestrate da un essere umano che non sa leggere codice.

## Cos'è

Questo repo è un **campo di sfida** fra tre attori:

- **Claude Architetto** — un'istanza di Claude Code che sceglie un caso
  reale di bug accaduto in un repo open source, ricostruisce lo stato
  pre-fix come sottocartella `sfida-NN-nome/` sul main e ne anonimizza
  i metadati.
- **Claude Sfidante** — una **diversa** istanza di Claude Code, senza
  memoria di cosa ha fatto Architetto, che riceve una working branch sul
  main con working directory dentro `sfida-NN-nome/`. Non sa di essere
  in una sfida: Ray la introduce come task di lavoro reale.
- **Ray** — l'orchestratore umano, giudice di gara. Non scrive codice,
  non lancia comandi git. Apre due finestre di Claude Code, scrive
  prompt in italiano, osserva, decide quando il round si chiude.

La sfida non è fra Ray e il codice. Ray non legge il codice. La sfida è
fra **Architetto** e **la coppia Ray+Sfidante**. Il delta misurabile è
Ray. Quel delta è la skill che si allena.

## Perché esiste

Le palestre esistenti (Gilded Rose, Codewars, Exercism, post-mortem di
Cloudflare) presuppongono un programmatore che legge codice. Ray non è
un programmatore. Ray è un **AI Orchestrator**: il suo mestiere è far
emergere risposte attraverso un'altra mente artificiale.

Nessuna palestra esistente misura quella skill. Questa sì.

E ogni round produce un artefatto: un **post-mortem condiviso** scritto
da Architetto e da Ray dopo la chiusura, che diventa materiale per il
libro 3 della trilogia *Dal Campo alla Terra*.

## I due principi strutturali

### 1. Framing realistico

Sfidante **non sa di essere in una sfida**. Ray gli si rivolge come se
gli avesse appena passato un task di lavoro vero: "Lavoriamo su questo
modulo `<nome>`, gli utenti riportano errore X, riproduci e sistema."
Niente menzioni della palestra, di Architetto, del fatto che il bug è
"deliberato".

Conseguenza: l'AI Sfidante non cerca trick. Lavora come lavorerebbe su
qualunque modulo di produzione. La skill che Ray esercita è quella vera:
dirigere un'AI dev su un problema ambiguo, restringere lo spazio di
ricerca, distinguere ipotesi promettenti da rabbit hole.

### 2. Isolamento del modulo

Ogni sfida vive in una **sottocartella** del main: `sfida-NN-nome/`.
Sfidante viene aperto con working directory dentro quella sottocartella.
Un `CLAUDE.md` locale, scritto come policy di confidenzialità inter-team,
istruisce di **non navigare fuori** dalla cartella del modulo.

Sfidante può fare tutti i `git log`, `git blame`, `git diff` che vuole
sulla working branch: leggerà solo storia del modulo, niente di
rivelatore. Tutto il materiale di orchestrazione (briefing per Ray,
chiavi del post-mortem, log) vive in directory hidden a livello root
(`.orchestrazione/`, `.architetto/`) che sono fuori dalla sua cartella.

Dettagli in [`AGENTI.md`](./AGENTI.md) e [`REGOLE.md`](./REGOLE.md).

## Come funziona un round

In sintesi (dettagli in [`AGENTI.md`](./AGENTI.md)):

1. Ray apre una finestra di Claude Code → Claude Architetto. Le dice:
   "Apro la sfida NN, proponi 3 candidati di caso reale." Architetto
   cerca repo open source TS con bug documentato, ne propone 3 a Ray
   anonimizzati. Ray sceglie.

2. Architetto costruisce `sfida-NN-nome/` sul main con la codebase
   pre-fix (anonimizzata nei metadati). Mette il briefing in
   `.orchestrazione/sfida-NN-nome/briefing-per-ray.md` e la chiave in
   `.architetto/sfida-NN-nome-postmortem-key.md`. Pusha sul main.

3. Ray apre una **seconda** finestra di Claude Code → Claude Sfidante,
   con `cd sfida-NN-nome` come working directory, partendo da una
   working branch (`ray-work-sfida-NN-nome`) dal main. Le dice in stile
   bug report: *"Modulo X, sintomo Y, sistemalo, stai dentro al modulo."*

4. Ray orchestra Sfidante: decide quale pista seguire, quando spingere,
   quando cambiare strategia. Logga le mosse in
   `.orchestrazione/sfida-NN-nome/log-orchestrazione.md`.

5. Quando il round chiude (vittoria/sconfitta/pareggio), Ray torna su
   Architetto. Architetto rivela il bug e scrive la sua parte del
   `POST-MORTEM.md`. Ray completa la sua. La working branch di Sfidante
   si merga sul main se ha vinto, altrimenti resta come archivio. La
   sottocartella `sfida-NN-nome/` resta intatta come museo.

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
├── sfida-01-query-filter/              ← codebase armata, modulo isolato
├── sfida-02-scheduler/
└── sfida-03-binary-parser/
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
