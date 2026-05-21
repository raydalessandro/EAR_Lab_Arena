# Stima Architetto — Sfida 02 — scheduler

> Scritto da Claude Architetto prima del push. **Ray, non aprire fino
> a chiusura del round.**

## Classe del bug

- **Classe**: **"Drift fra lexer permissivo e handler che gestisce un
  sottoinsieme"** — la regex (o equivalente filtro pre-validazione)
  ammette un carattere/forma come "lecito" nel campo, ma il parser
  successivo non lo gestisce. L'input passa la prima barriera, viene
  perso o consumato male nella seconda, e produce uno stato interno
  silenziosamente sbagliato (no crash, output errato).
- **Status nella tassonomia**: candidata-nuova.
- **Caratteristica per orchestratore**: il sintomo è **funzionale, non
  un errore**. Non c'è uno stack trace da rincorrere. L'orchestratore
  deve **sperimentare per isolare quale input produce il bug**, poi
  tracciare due step distinti della pipeline (validatore + parser) e
  notare l'asimmetria fra cosa il primo ammette e cosa il secondo
  gestisce. Tracciare due step asimmetrici è cognitivamente più caro
  che rincorrere un errore.

## Difficoltà attesa

- **Scala**: **3/5** (medio)
- **Perché**: niente errore concreto, sintomo "frequenza sbagliata"
  vago. Richiede esperimenti per isolare il pattern problematico. Una
  volta isolato, il fix è semplice — ma arrivarci a isolare è il vero
  costo. Codebase più grande della sfida 01 (~2.350 LOC vs ~1.300).

## Tempo atteso

- **Range**: **1-3 ore**
- **Punto di rottura**: oltre le 4 ore con bassa progressione,
  probabile resa o cambio strategia. La fase critica è la sperimentazione
  con pattern diversi — se l'orchestratore non struttura
  l'esplorazione, può girare in tondo.

## Catena di ragionamento prevista

1. Riprodurre con un pattern di partenza (es. quello del briefing).
2. Sperimentare con varianti del pattern. Provare modifiers diversi
   ($L$ vs $#L$ vs $#N$, ecc.) per capire quale famiglia di pattern
   triggera il bug.
3. Trovare i commenti nel file di parsing del pattern che dichiarano
   "questi modifiers sono permessi sul day-of-week".
4. Tracciare la pipeline: `new Cron(pattern)` → costruzione CronPattern
   → parsePart → extractNth.
5. Confrontare cosa la regex/lexer ammette (`L` lecito) con cosa
   extractNth gestisce (solo `#`).
6. Aggiungere il branch mancante per `L` standalone.

## Rabbit hole probabili

- **Rabbit hole 1 — "bug nello scheduler / timezone"**: il sintomo
  "parte troppo spesso" suggerisce un problema di calcolo temporale.
  L'AI potrebbe esplorare `date.ts`, gestione DST, timezone — codice
  complesso ma irrilevante per questo bug.
- **Rabbit hole 2 — "il pattern è sbagliato"**: l'orchestratore potrebbe
  dubitare del proprio esempio e provare cento variazioni invece di
  attaccare il parser.
- **Rabbit hole 3 — "leggere tutta la spec cron"**: l'orchestratore
  può perdere tempo cercando di capire la spec cron POSIX/Quartz invece
  di guardare cosa il *modulo specifico* dichiara di supportare nei
  suoi commenti.

## Prediction esplicita

- **P1**: La prima area che l'AI guarderà (su prompt non-direttivo) sarà
  `nextRun()` / `date.ts` / il calcolo del prossimo istante — perché
  il sintomo è "parte troppo spesso". Il parser pattern sarà guardato
  solo dopo, su redirezione di Ray.
- **P2**: Il fix sarà di **3-15 righe** in **1 solo file** (`pattern.ts`).
  Se diventa più grosso, l'orchestratore è andato in un rabbit hole.

## Note operative per Architetto futuro

- Codebase Deno-only: setup tecnico potrebbe creare attrito. Se Ray non
  ha Deno installato, potrebbe perdere 15-30 minuti solo per il setup.
- I commenti nel file `pattern.ts` (linee ~319-320 nel pre-fix)
  dichiarano i caratteri permessi per ciascun campo. Sono **il principale
  indizio** che esiste nella codebase. Se l'orchestratore non li nota,
  può perdere molto tempo.
