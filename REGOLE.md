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
sottocartella**:

```bash
cd sfida-NN-nome
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

## Regola 3 — Architetto non introduce bug invisibili

**Affidata all'onore di Architetto, verificata da Ray a fine round.**

Un bug è valido se:

- È **inferibile dal codice del modulo**, senza riferimenti a sistemi
  esterni o ad altre cartelle del repo. Esiste una catena di ragionamento
  che, leggendo solo i file di `sfida-NN-nome/`, porta a trovarlo.
- È **producibile**. Il codice rotto si comporta diversamente da quello
  sano in qualche modo osservabile (test che fallisce, output sbagliato,
  errore runtime, comportamento incoerente in una situazione specifica
  che Ray descrive nel prompt iniziale).
- È **plausibile**. Il bug assomiglia a qualcosa che un'AI potrebbe
  davvero produrre per ambiguità di specifica, drift di contesto o
  disattenzione — o qualcosa che è realmente accaduto in produzione su
  un repo open source vero, da cui Architetto ha derivato lo scenario.

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
