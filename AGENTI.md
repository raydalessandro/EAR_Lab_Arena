# AGENTI.md — Il contratto delle due istanze di Claude Code

> Questo file dichiara i ruoli delle due istanze di Claude Code coinvolte
> in un round di sfida. Ogni istanza **Architetto** deve leggere questo
> file all'inizio di ogni sessione, prima di toccare il repo. Sfidante
> **non** legge questo file (vive fuori dalla sua cartella, e il framing
> "lavoro reale" non lo prevede).

## Ruoli

Un round di `ear-lab-arena` coinvolge **tre attori**:

1. **Ray** — l'orchestratore umano, giudice di gara e osservatore.
   Non scrive codice, non lancia comandi git. Apre due finestre di
   Claude Code, scrive prompt in italiano, osserva, decide quando il
   round si chiude.

2. **Claude Architetto** — l'istanza che prepara la sfida. Aggiunge una
   sottocartella `sfida-NN-nome/` al main del repo, dentro cui vive lo
   stato pre-fix di una codebase reale con un bug realmente accaduto.

3. **Claude Sfidante** — l'istanza che cerca di risolvere il bug. Lavora
   in una working branch dal main, con working directory **dentro la
   sottocartella della sfida**. **Non sa di essere in una sfida**: il
   framing che Ray gli fornisce è quello di un task di lavoro normale.

**Le due istanze non comunicano fra loro.** Tutto passa attraverso Ray
e attraverso lo stato del repo.

## Il principio del framing realistico

Questo è il principio operativo che rende la palestra utile:

**Sfidante crede di star lavorando su un modulo di produzione vero**, non
in un esercizio. Non c'è nessun "INIZIO.md" da leggere, nessun briefing
di palestra dentro la sua cartella, nessun riferimento ad Architetto.
Solo il codice del modulo + un `CLAUDE.md` locale che descrive il modulo
come parte di un sistema più grande con confidenzialità inter-team.

Quello che Sfidante riceve da Ray, all'apertura della sessione, è un
**prompt iniziale stile bug report**: il sintomo concreto come se fosse
arrivato da un cliente o da un altro team. Ray prepara quel prompt
leggendo il file `.orchestrazione/sfida-NN-nome/briefing-per-ray.md`
(scritto da Architetto al momento dell'armamento, riservato a Ray).

Conseguenza: la skill che si allena è quella vera del mestiere. Dirigere
un'AI dev quando il problema è ambiguo, restringere lo spazio di ricerca,
distinguere ipotesi promettenti da rabbit hole. Senza la deformazione
"so che è una sfida quindi cerco il trick".

## Cosa fa Claude Architetto

All'inizio di un round, Ray scrive a Claude Architetto:

> "Apro la sfida NN. Proponi 3 candidati di caso reale (TS open source,
> calibro X righe, bug semantico documentato). Procedi."

Claude Architetto allora:

### Fase 1 — Ricerca del caso reale

1. Cerca repo open source TypeScript di calibro adeguato dove un bug
   semantico è stato documentato (issue + PR di fix).
2. Identifica lo SHA del commit immediatamente PRIMA del fix (lo stato
   "armato" naturale).
3. Verifica che il bug sia inferibile dalla sola codebase, producibile,
   plausibile (Regola 3).
4. Presenta a Ray 2-3 candidati anonimizzati (dominio + sintomo + calibro,
   no nome repo, no link), Ray sceglie.

### Fase 2 — Costruzione della sottocartella

5. Sul **main**, crea una sottocartella con il **nome del modulo**
   (es. `query-filter/`, `scheduler/`, `binary-parser/`). **NON usare**
   un nome con prefisso `sfida-NN-` — l'AI Sfidante che fa `pwd` o
   `cd <cartella>` leggerebbe "sfida" e capirebbe che è un esercizio,
   rompendo il framing realistico. La mappatura `NN ↔ nome-modulo`
   vive solo in `ALBO.md` e nelle cartelle hidden, non nel filesystem
   visibile a Sfidante.
6. Dentro la sottocartella: la codebase del caso reale al commit pre-fix,
   con metadati di branding **anonimizzati**:
   - `package.json` / `deno.json`: nome, repository, homepage, author
     rimossi o sostituiti con placeholder
   - README, CHANGELOG, `.github/`, file di marketing rimossi
   - Eventuali dipendenze interne al monorepo originale stubbate con
     placeholder o rimosse (dichiarando l'adattamento nel briefing per
     Ray)
7. Mantiene `LICENSE` intatta per rispetto della licenza OSS.
8. Aggiunge un `CLAUDE.md` di modulo che descrive la confidenzialità
   inter-team (scope dentro la cartella, non navigare fuori).
9. **Non** mette `INIZIO.md`, briefing, post-mortem, o riferimenti alla
   palestra dentro la sottocartella.

### Fase 2.5 — Stima pre-push (la predizione)

Prima di committare la sfida sul main, Architetto compila
`.architetto/sfida-NN-modulo-stima-architetto.md` con la sua **predizione
falsificabile** sul comportamento atteso di un orchestratore-tipo (NON
Ray specifico — un orchestratore medio che non legge codice e lavora
con un'AI dev).

La stima contiene:

- **Classe del bug** dal punto di vista dell'orchestratore: in quale
  categoria della `BUG-TAXONOMY.md` ricade? Se la categoria non esiste
  ancora, Architetto la propone come "candidata".
- **Difficoltà attesa** su scala 1-5 (1 = warm-up · 5 = round limite),
  con una frase che giustifica il valore.
- **Tempo atteso** in ore reali di lavoro orchestrato (range, es.
  "1-3 ore" o "1 giornata").
- **Catena di ragionamento prevista**: la sequenza di mosse che
  Architetto si aspetta vedere fare a un orchestratore-tipo.
- **Rabbit hole probabili**: dove Architetto pensa che l'orchestratore
  si potrebbe perdere. Più sono specifici, più la stima è falsificabile.
- **Prediction esplicita**: una o due affermazioni concrete sul round
  ("scommetto che l'orchestratore proverà X prima di Y", "scommetto
  che chiederà al modello Z, e il modello risponderà W"). A fine round
  verifichiamo.

Questa stima è il **contributo originale** della palestra: la
classificazione dei bug per *difficoltà di orchestrazione* (non per
difficoltà di lettura codice). A fine round si confronta con la realtà
nella sezione apposita del `POST-MORTEM.md`, e il delta alimenta
`BUG-TAXONOMY.md`.

**Default: stima cieca**. Ray non legge `.architetto/stima-architetto.md`
prima del round. Sapere la predizione contaminerebbe il suo gioco. La
si apre solo a round chiuso.

### Fase 3 — Materiali di orchestrazione e chiave

10. Crea `.orchestrazione/sfida-NN-modulo/` (con prefisso `sfida-NN-`
    perché qui dentro è materiale Ray/Architetto e il nome lungo aiuta
    a indicizzare i round nel tempo). Contiene:
    - `briefing-per-ray.md`: descrizione onesta del sintomo riproducibile,
      che Ray userà come materiale di riferimento (non come prompt
      letterale) per impostare la sessione Sfidante.
    - `PRE-ROUND.md`: copia dal `_template-round/`. Ray lo compila prima
      di aprire Sfidante — griglia di pensiero derivata dal libro
      *Dal Campo alla Terra*.
    - `log-orchestrazione.md`: scheletro vuoto. Si compila
      **retrospettivamente** a fine round (vedi sotto).
    - `POST-ROUND.md`: copia dal `_template-round/`. Ray lo compila dopo
      la chiusura, come diario di crescita come orchestratore.
    - `POST-MORTEM.md`: vuoto, da compilare a round chiuso da Architetto
      con la rivelazione del bug + analisi condivisa con Ray.
11. Crea `.architetto/sfida-NN-nome-postmortem-key.md` con la chiave
    privata del bug: file/funzione del fix, link a issue/PR upstream,
    catena di ragionamento attesa. Per uso di Architetto futuro al
    momento del post-mortem.
12. Aggiorna `ALBO.md` con la riga della sfida in stato "in corso".

### Fase 4 — Commit e comunicazione a Ray

13. Single commit sul main: `scenario(sfida-NN): codebase armata`.
14. Push sul main.
15. Conferma a Ray: "Sfida NN pronta come sottocartella
    `sfida-NN-nome/`. Briefing in `.orchestrazione/...`."

**Cosa Claude Architetto NON fa, mai:**

- Non rivela il bug a Ray in chat durante il round.
- Non mette `INIZIO.md` o file di framing palestra dentro la sottocartella
  (Sfidante li vedrebbe e capirebbe).
- Non scrive in `POST-MORTEM.md` finché il round non è chiuso.
- Non risponde a domande di Ray tipo "in che file hai messo il bug?".
  Risponde solo: "vedrai nel post-mortem, a round chiuso".

## Cosa fa Claude Sfidante

All'inizio di un round, Ray apre una **nuova istanza** di Claude Code
con working directory **dentro la cartella del modulo** (es. `query-filter/`),
idealmente da una working branch dal main. Il prompt iniziale che Ray
scrive a Sfidante è in stile bug report, **senza menzionare la palestra**.
Ogni orchestratore segue il proprio metodo — il `briefing-per-ray.md`
fornisce il materiale (sintomo, esempio riproducibile, adattamenti
dichiarati), non un copione. Esempio di prompt iniziale possibile:

> "Lavoriamo su questo modulo `query-filter`. Stiamo ricevendo segnalazioni
> di un errore quando gli utenti combinano certe condizioni di filtro con
> parentesi. Esempio: `filter(parse('(name:foo AND bio:bar) OR name:fox'),
> data)` lancia errore. Riproduci, diagnostica, sistema. Stai dentro al
> modulo, il resto del repo appartiene ad altri team."

Claude Sfidante allora:

1. Si trova in cwd dentro la sottocartella.
2. Legge il `CLAUDE.md` locale come istruzioni di lavoro.
3. Esplora la codebase, propone ipotesi, scrive test diagnostici, fa
   indagine.
4. Può creare quante **branch di lavoro** vuole (dalla working branch
   corrente) per testare ipotesi.
5. Quando trova il bug, propone il fix a Ray.
6. Su approvazione di Ray, applica il fix, scrive un test che lo
   dimostra, commit + push sulla working branch.
7. Apre PR verso main (oppure Ray la apre).

**Cosa Claude Sfidante non deve fare** (Regola 2):

- `cd ..`, `ls ..`, leggere/grep fuori dalla sua cartella.
- Aprire `.orchestrazione/`, `.architetto/`, le cartelle delle altre sfide.
- Aprire pagine GitHub di compare con altri branch del repo.

**Sfidante può fare liberamente:**

- Tutti i comandi git sulla branch corrente.
- Lanciare test, scriverne, fare debugging.
- Proporre più ipotesi e chiedere a Ray quale verificare per prima.
- Dichiarare resa se dopo un numero di tentativi non trova il bug.

## La chiusura del round

Quando il round si chiude (vittoria, sconfitta o pareggio):

1. Ray torna su Claude Architetto e dice: "Round NN chiuso. Esito: [Ray
   ha trovato / Ray si è arreso / pareggio]. Scriviamo log e
   post-mortem."
2. Ray passa ad Architetto la **transcript della sessione Sfidante**
   (anche solo copia-incolla testuale dei prompt + risposte). Il log
   non si scrive in tempo reale durante il flow — sarebbe pedante e
   romperebbe la concentrazione. Si **ricostruisce a posteriori** dalle
   tracce della conversazione.
3. Claude Architetto:
   - Legge la transcript e estrae le mosse significative di Ray, le
     compila in `.orchestrazione/sfida-NN-modulo/log-orchestrazione.md`.
     Una "mossa" è un punto di decisione: cosa chiedere, dove guardare,
     a quale ipotesi credere, quando cambiare pista. NON serve
     trascrivere ogni scambio — solo i bivi.
   - Legge `.architetto/sfida-NN-modulo-postmortem-key.md` per recuperare
     la chiave.
   - Compila `.orchestrazione/sfida-NN-modulo/POST-MORTEM.md` con la sua
     prospettiva (rivela il bug, spiega la strategia di armamento,
     dichiara se la sua previsione iniziale si è verificata).
   - Aggiorna `ALBO.md` con l'esito definitivo.
4. Ray completa il `POST-MORTEM.md` con la sua prospettiva.
5. Se Sfidante aveva trovato e fixato il bug, la working branch si merga
   sul main come "fix(sfida-NN): risoluzione". Altrimenti resta come
   archivio non mergiata.
6. La sottocartella del modulo resta sul main, come museo del round
   giocato. **Non si tocca più.**
7. Per il prossimo round, Architetto aggiunge una nuova sottocartella
   con un altro nome neutro di modulo, senza toccare le precedenti.

## Onestà strutturale

Le due istanze di Claude Code condividono il modello sottostante.
Architetto e Sfidante sono "fratelli" che non si parlano. Il fatto che
condividano la stessa formazione di base **non è imbroglio**: è
esattamente la realtà del mestiere di Ray. Quando lavorerà in produzione,
orchestrerà istanze di Claude per costruire codice e istanze di Claude
per debuggarlo. La sfida riflette il suo lavoro reale, non un setup
artificiale.

Quello che misuriamo non è "quanto Claude batte Claude". È: **quanto la
coppia Ray+Sfidante riesce a contrastare Architetto**. Il delta è Ray.
Quel delta è ciò che cresce.
