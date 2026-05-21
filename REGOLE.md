# Regole del duello

Tre regole. Tutto il resto si scopre giocando.

Prima di leggerle, una distinzione importante: alcune regole sono
**impedite strutturalmente** (semplicemente non puoi violarle perché il
setup tecnico non te lo permette), altre sono **affidate all'onore**
(potresti violarle, ma se lo fai bari solo con te stesso e rovini il
valore della pratica).

Diciamole apertamente, una per una.

## Regola 1 — Sfidante non sa che è una sfida

**Affidata all'onore di Ray.**

Il framing operativo è realistico, non ludico. Quando Ray apre la
sessione di Claude Sfidante, **non** la introduce come "una sfida della
palestra". La introduce come quello che sarebbe: una richiesta di lavoro
arrivata al team. Ray racconta il sintomo come se fosse un bug report
ricevuto da un cliente o da un altro team, niente meta-riferimenti a
"trovare il bug nascosto".

Cosa Ray NON dice a Sfidante:

- "Questo è un esercizio di debugging."
- "C'è un bug deliberato in questo codice."
- "Sei l'agente Sfidante di un duello asimmetrico."
- Riferimenti a `ear-lab-arena`, ad Architetto, alla palestra, all'ALBO.

Cosa Ray dice (esempio):

> "Abbiamo questo modulo `<nome>` in produzione. Gli utenti segnalano
> che <sintomo concreto>. Riproduci, diagnostica, sistema. Stai dentro
> al modulo, il resto del repo appartiene ad altri team e per policy
> non lo guardiamo. Cosa proponi come prima mossa?"

Questa è la skill che la palestra allena: **dirigere un'AI come si
dirige un junior dev al lavoro vero**, non come si manovra una pedina
in un gioco di indovinelli.

## Regola 2 — Sfidante non esce dalla cartella del modulo

**Impedita strutturalmente quanto possibile, e per il resto affidata
all'onore di Ray.**

Ogni sfida vive in una sottocartella del repo: `sfida-NN-nome/`. Tutto
quello che serve a Sfidante per risolvere il bug è lì dentro. Tutto
quello che è **fuori** da quella cartella appartiene a "altri team" nel
framing realistico, e non va letto.

Ray apre la sessione di Sfidante con **working directory dentro la
cartella del modulo** (es. `query-filter/`, `scheduler/`, niente
prefisso `sfida-` nel nome — l'AI lo riconoscerebbe come "challenge"):

```bash
cd <nome-modulo>
claude
```

Dentro la sottocartella vive anche un `CLAUDE.md` che ripete questa
regola in forma di policy del team (NDA inter-modulo). Claude Code lo
legge automaticamente all'avvio e lo rispetta come istruzione di prima
classe.

Sfidante **non deve**:

- `cd ..` o navigare fuori dalla cartella del modulo
- Leggere, listare o grep-pare file in `../`, in cartelle sorelle, o in
  `../.architetto/`, `../.orchestrazione/`, ecc.
- Aprire il `.git` del repo padre per mining di storia non rilevante

Tecnicamente Sfidante *potrebbe* farlo (Claude Code ha accesso al
filesystem dal cwd in su). Quindi questa parte è **affidata all'onore
di Ray**: Ray non gli chiede di guardare fuori, e se Sfidante lo propone
spontaneamente, Ray lo riporta dentro.

Una protezione strutturale opzionale: Ray può configurare un
`.claude/settings.json` locale che restringe `Read`/`Bash` ai path dentro
la cartella. È un livello in più, non un obbligo — decidiamo round per
round.

Sfidante **può fare liberamente**:

- Tutti i `git log`, `git blame`, `git diff` sulla branch di lavoro
  corrente. La storia del singolo modulo non rivela l'intenzione di
  armamento.
- Leggere ogni file dentro la sua cartella.
- Lanciare i test, scriverne di nuovi, fare debugging runtime.
- Aprire branch di lavoro per esperimenti diagnostici.

## Regola 3 — Lo scenario deve battere l'AI da sola

**Affidata all'onore di Architetto, verificata da Ray a fine round.**

Questa è la regola che separa un round vero da una perdita di tempo.
Un caso è scenario di palestra se:

- Un'AI dev moderna (Claude / equivalenti), aperta da sola sulla
  cartella del modulo e con un prompt non-direttivo del tipo "c'è
  questo sintomo, riproduci e fixa", **fallirebbe** o **convergerebbe
  su un fix sbagliato** in tempo ragionevole. Cioè: l'orchestratore
  deve aggiungere valore non trascurabile alla soluzione.
- Esiste almeno **una dimensione "extra-codebase"** che richiede
  l'orchestratore: conoscenza di business non scritta nel codice,
  vincoli da altri team / contratti inter-modulo, test esistenti
  fuorvianti, confirmation bias prevedibile dell'AI su una pista
  sbagliata, trade-off architetturale che richiede una decisione umana,
  pressione temporale operativa, storia del codice non leggibile dal
  solo diff (vedi `BUG-TAXONOMY.md` per il catalogo aggiornato).
- È **plausibile in un contesto di lavoro reale**: deriva da un caso
  realmente accaduto, o ricalca un pattern documentato (post-mortem
  pubblici, CVE, blog di engineering).

Un caso **non è scenario di palestra** se:

- È un bug semantico pulito inferibile dalla sola codebase del modulo,
  con messaggio d'errore specifico che porta dritto al colpevole.
  Esempio archiviato: tipo enumerato non gestito in uno switch (Sfida
  01 nella prima calibrazione). L'AI da sola lo risolve in pochi
  minuti — è esercizio per dev pre-AI, non per orchestratore.
- Richiede di indovinare informazioni che non sono né nel codice né
  trasmissibili da Ray nel prompt (config segrete, ambiente).
- Dipende da coincidenze, timing perfetto, o variabili di sistema non
  documentate.

Se a fine round Ray dice *"l'AI l'ha risolto da sé in 3 mosse senza
che dovessi dirigere niente"*, il round è invalido come scenario di
palestra. Architetto perde, il caso entra in `BUG-TAXONOMY.md` sotto
gli **anti-pattern** (utile lo stesso: anche sapere cosa non funziona
è dato).

Un bug **non è valido** se:

- Richiede di indovinare informazioni esterne (costanti magiche,
  configurazioni di ambiente non documentate, dipendenze non installate).
- Dipende da pure coincidenze.
- È così oscuro che nessuna catena di ragionamento ragionevole,
  partendo dalla sola cartella del modulo, porterebbe a trovarlo.

Se a fine round Ray dice *"non c'era modo di trovarlo restando dentro
al modulo"*, e Architetto non riesce a mostrare la catena di ragionamento
interna, il round è invalido. Architetto perde, e il round non conta
per l'albo.

## Quello che non è scritto qui

Tante cose. Esempi:

- Limiti di tempo? Per ora no. Si vedrà se servono.
- Numero massimo di prompt a Sfidante? Per ora no.
- Ray può aprire una terza istanza Claude Code in mezzo al round?
  Per ora sì, ma deve loggarlo in `.orchestrazione/sfida-NN-nome/log-orchestrazione.md`.
- Si vincono punti? Per ora basta vittoria / sconfitta / pareggio / invalido.

Queste regole emergeranno dai primi round. Ogni volta che un round
produce una situazione "non chiarita dalle regole", aggiorniamo questo
file. Le regole sono un documento vivo.
