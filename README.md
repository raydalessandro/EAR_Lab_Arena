# ear-lab-arena

> Una palestra di duelli asimmetrici fra due istanze di Claude Code
> orchestrate da un essere umano che non sa leggere codice.

## Cos'è

Questo repo è un **campo di sfida** fra tre attori:

- **Claude Architetto** — un'istanza di Claude Code che riceve una
  codebase sana, vi introduce un bug deliberato in un ambiente di
  lavoro isolato, e pusha lo stato finale armato su una branch.
- **Claude Sfidante** — una **diversa** istanza di Claude Code, senza
  memoria di cosa ha fatto Architetto, che riceve la branch armata
  e prova a trovare e risolvere il bug.
- **Ray** — l'orchestratore umano, giudice di gara. Non scrive codice,
  non lancia comandi git. Apre due finestre di Claude Code, scrive
  prompt in italiano, osserva, decide quando il round si chiude.

La sfida non è fra Ray e il codice. Ray non legge il codice.
La sfida è fra **Architetto** e **la coppia Ray+Sfidante**.
Il delta misurabile è Ray. Quel delta è la skill che si allena.

## Perché esiste

Le palestre esistenti (Gilded Rose, Codewars, Exercism, post-mortem
di Cloudflare) presuppongono un programmatore che legge codice.
Ray non è un programmatore. Ray è un **AI Orchestrator**: il suo
mestiere è far emergere risposte attraverso un'altra mente artificiale.

Nessuna palestra esistente misura quella skill. Questa sì.

E ogni round produce un artefatto: un **post-mortem condiviso**, scritto
da Architetto e da Ray dopo la chiusura, che diventa materiale per il
libro 3 della trilogia *Dal Campo alla Terra*.

## Il principio strutturale: storico sterile

Per evitare che Sfidante scopra il bug confrontando lo storico
git con il main, l'arena adotta un principio tecnico esplicito:

**Architetto non lavora mai dentro `ear-lab-arena` durante la fase di
armamento.** Lavora in un ambiente isolato, modifica la codebase lì,
e poi pusha **solo lo stato finale** sulla branch armata, come singolo
commit. La storia git della branch armata risulta sterile: `git log`
mostra un solo commit, `git blame` attribuisce tutto al momento
dell'armamento, nessun confronto interno alla branch rivela il bug.

Dettagli in [`AGENTI.md`](./AGENTI.md) e [`REGOLE.md`](./REGOLE.md).

## Come funziona un round

In sintesi (dettagli in [`AGENTI.md`](./AGENTI.md)):

1. Ray apre una finestra di Claude Code → Claude Architetto. Le dice:
   "Apro la sfida NN, la codebase è X". Architetto pulisce il main,
   carica la codebase pulita, lavora in ambiente isolato per armare
   il bug, pusha la branch `sfida-NN-nome` con singolo commit.

2. Ray apre una **seconda** finestra di Claude Code → Claude Sfidante,
   in checkout della branch armata (idealmente con `--single-branch`
   per non avere nemmeno riferimento al main). Le dice: "C'è un bug,
   trovalo". Sfidante esplora, propone, scrive test, fa diagnosi.

3. Ray orchestra Sfidante: decide quale pista seguire, quando spingere,
   quando cambiare strategia. Logga le mosse significative in
   `log-orchestrazione.md` nella branch armata.

4. Quando il round chiude (vittoria/sconfitta/pareggio), Ray torna su
   Architetto. Architetto rivela il bug e scrive la sua parte del
   `POST-MORTEM.md`. Ray completa la sua. La branch resta come archivio,
   il main si pulisce per il round successivo.

## Le tre regole

Vedi [`REGOLE.md`](./REGOLE.md). Sono solo tre, distinte chiaramente
fra quelle impedite strutturalmente e quelle affidate all'onore.

## Struttura del repo

```
ear-lab-arena/
├── README.md            ← questo file
├── REGOLE.md            ← le 3 regole del duello
├── AGENTI.md            ← contratto Architetto / Sfidante / Ray
├── ALBO.md              ← elenco dei round giocati, esiti
├── _template-round/     ← scheletro di un round (riferimento didattico)
└── [codebase corrente]  ← codebase del round in corso (cambia ogni volta)
```

## Per chi arriva qui da fuori

Se sei capitato su questo repo per caso e vuoi capirlo in 30 secondi:

1. Apri [`ALBO.md`](./ALBO.md): vedi i round giocati e i loro esiti.
2. Vai su una branch `sfida-NN-*`: trovi `INIZIO.md` (il briefing),
   `log-orchestrazione.md` (il diario di Ray durante il round),
   `POST-MORTEM.md` (la rivelazione del bug e le lezioni).
3. Leggi il `POST-MORTEM.md` di un round. È lì che c'è la lezione.

Il codice della codebase del round corrente, sul main, non ti serve
in retrospettiva. Le lezioni vivono nei post-mortem delle branch.
