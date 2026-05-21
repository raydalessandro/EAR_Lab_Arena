# Regole del duello

Tre regole. Tutto il resto si scopre giocando.

Prima di leggerle, una distinzione importante: alcune regole sono
**impedite strutturalmente** (semplicemente non puoi violarle perché
il setup tecnico non te lo permette), altre sono **affidate all'onore**
(potresti violarle, ma se lo fai bari solo con te stesso e rovini
il valore della pratica).

Diciamole apertamente, una per una.

## Regola 1 — Lo storico della branch armata non esiste

**Impedita strutturalmente.**

Claude Architetto non arma la branch lavorando dentro `ear-lab-arena`.
Lavora in un suo ambiente isolato: clona la codebase originale,
la modifica, e quando ha finito **pusha solo lo stato finale** su una
nuova branch di `ear-lab-arena`, come singolo commit di nome
`scenario(sfida-NN): codebase armata`.

Conseguenze:

- `git log` sulla branch armata mostra un solo commit, sterile.
- `git diff HEAD~1` non funziona, non c'è un HEAD~1.
- Non esistono commit intermedi che rivelino cosa è stato cambiato.
- `git blame` mostra che ogni riga è stata "scritta" nel commit di
  armamento — anche le righe che Architetto non ha toccato.

Sfidante può fare tutti i `git log`, `git blame`, `git show` che
vuole: non troverà niente di utile. Lo storico semplicemente non c'è.

## Regola 2 — Sfidante vede solo la branch armata, mai il main

**Misto: impedita strutturalmente quanto possibile, e per il resto
affidata all'onore di Ray.**

Ray apre Claude Sfidante in checkout sulla branch `sfida-NN-nome`.
Sfidante può:

- Leggere, modificare, eseguire **tutti i file della branch armata**.
- Creare quante **branch di lavoro** vuole, a partire dalla branch
  armata, per provare fix, esperimenti diagnostici, varianti. Tutte
  queste branch nascono dalla branch armata, non dal main.
- Lanciare i test, fare debugging runtime, scrivere test diagnostici
  aggiuntivi.

Sfidante **non deve**:

- Fare `git checkout main`.
- Fare `git diff main`.
- Aprire la pagina compare su GitHub (`/compare/main...sfida-NN`).
- Fare `git log main`, `git show main`, o qualsiasi comando che legga
  contenuto della branch main.

Tecnicamente Sfidante *potrebbe* fare queste cose (sono comandi git
leciti). Quindi questa parte è **affidata all'onore di Ray**, che è
il giudice di gara: Ray non chiede a Sfidante di fare confronti col
main, e se Sfidante li propone di sua iniziativa, Ray lo ferma.

Una piccola eccezione strutturale che possiamo introdurre:
Ray, prima di aprire Sfidante, può cancellare la cartella `.git/refs/heads/main`
nel checkout locale (o usare un git clone con `--single-branch --branch
sfida-NN-nome`). Questo rende main letteralmente irraggiungibile per
Sfidante. È un'opzione, non un obbligo: la decisione la prendiamo
sfida per sfida nel `INIZIO.md`.

## Regola 3 — Architetto non introduce bug invisibili

**Affidata all'onore di Architetto, verificata da Ray a fine round.**

Un bug è valido se:

- È **inferibile dal codice** della branch armata, senza confronti con
  main. Esiste una catena di ragionamento che, leggendo solo lo stato
  corrente, porta a trovarlo.
- È **producibile**. Il codice rotto si comporta diversamente da quello
  sano in qualche modo osservabile (test che fallisce, output sbagliato,
  errore runtime, comportamento incoerente in una situazione specifica
  descritta nel briefing).
- È **plausibile**. Il bug assomiglia a qualcosa che un'AI potrebbe
  davvero produrre per ambiguità di specifica, drift di contesto,
  o disattenzione. Non a un sabotaggio surreale.

Un bug **non è valido** se:

- Richiede di indovinare informazioni esterne (costanti magiche,
  configurazioni di ambiente non documentate, dipendenze non installate).
- Dipende da pure coincidenze (es. il bug si manifesta solo se l'orario
  del sistema è un certo millisecondo).
- È così oscuro che nessuna catena di ragionamento ragionevole,
  partendo dalla branch armata sola, porterebbe a trovarlo.

Se a fine round Ray dice *"non c'era modo di trovarlo senza vedere
il main"*, e Architetto non riesce a mostrare la catena di ragionamento
interna alla branch, il round è invalido. Architetto perde, e il round
non conta per l'albo.

## Quello che non è scritto qui

Tante cose. Esempi:

- Limiti di tempo? Per ora no. Si vedrà se servono.
- Numero massimo di prompt a Sfidante? Per ora no.
- Ray può aprire una terza istanza Claude Code in mezzo al round?
  Per ora sì, ma deve loggarlo in `log-orchestrazione.md` come
  "ho cambiato AI di supporto" e indicare perché.
- Si vincono punti? Per ora basta vittoria / sconfitta / pareggio /
  invalido.

Queste regole emergeranno dai primi round. Ogni volta che un round
produce una situazione "non chiarita dalle regole", aggiorniamo
questo file. Le regole sono un documento vivo.
