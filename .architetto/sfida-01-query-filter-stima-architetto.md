# Stima Architetto — Sfida 01 — query-filter

> Scritto da Claude Architetto prima del push. **Ray, non aprire fino
> a chiusura del round.** A round chiuso confrontiamo voce per voce
> con la realtà.

## Classe del bug

- **Classe**: **"Exhaustiveness check mancante su tipo discriminato di
  dominio"** — uno switch (o equivalente) gestisce alcuni varianti di
  un tipo somma del dominio, ma non tutte. Il caso non gestito cade nel
  ramo di default che assume una proprietà che il caso mancante non ha.
- **Status nella tassonomia**: candidata-nuova (prima ipotesi della
  palestra).
- **Caratteristica per orchestratore**: il messaggio d'errore parla del
  *sintomo locale* della caduta nel default (es. "expected X to be
  defined"), non della *causa strutturale* (un tipo non gestito).
  L'orchestratore-tipo è tentato di rincorrere il sintomo letterale
  ("perché X è undefined?") invece di chiedersi "perché siamo arrivati
  qui? che tipo di nodo ha prodotto questo caso?".

## Difficoltà attesa

- **Scala**: **2/5** (facile-medio, adatto come warm-up)
- **Perché**: il bug vive in un file solo (~170 righe), il messaggio
  d'errore è specifico, l'AI con context completo del file vede tutto.
  Il vero lavoro dell'orchestratore è non lasciare che l'AI rincorra
  il sintomo letterale, ma la guidi a confrontare i tipi gestiti con
  quelli dichiarati.

## Tempo atteso

- **Range**: **30-90 minuti**
- **Punto di rottura**: oltre le 2 ore l'orchestratore probabilmente
  si è arenato in un rabbit hole tipo "controllo difensivo su `left`".

## Catena di ragionamento prevista

1. Riprodurre il bug con l'esempio dato (5 minuti).
2. Tracciare la pipeline: dove parte la chiamata, dove arriva l'errore.
3. Aprire il file dell'errore, identificare la funzione che lo emette.
4. Notare che c'è uno switch/serie di if sui tipi di nodo AST.
5. Confrontare i tipi gestiti con quelli dichiarati nei tipi del modulo
   (`types.ts` o simile).
6. Realizzare che un tipo è dichiarato ma non gestito.
7. Aggiungere il branch mancante (ricorsiva su `expression`).

## Rabbit hole probabili

- **Rabbit hole 1 — "left is undefined"**: l'AI tratta il messaggio
  d'errore letteralmente e propone un controllo null/undefined sulla
  proprietà. Sintomo si nasconde (l'errore cambia o sparisce), ma il
  bug logico resta.
- **Rabbit hole 2 — "bug nel parser"**: l'AI sospetta che `parse()` non
  produca l'AST giusto per le query con parentesi, e va a investigare
  in `parse.ts` / `grammar.ts`. In realtà `parse()` è corretto.
- **Rabbit hole 3 — "AST shape mismatch"**: l'AI propone di trasformare
  l'AST dopo il parse per "appiattire" le parentesi prima di passarlo a
  filter. Funziona ma è gold-plating: non risolve il bug strutturale,
  lo aggira.

## Prediction esplicita

- **P1**: La prima ipotesi che l'AI proporrà (senza guida di Ray) sarà
  qualcosa tipo "aggiungere un controllo `if (left)` o un null-coalescing
  per evitare l'errore". È la lettura letterale del messaggio. Ray dovrà
  rifiutarla.
- **P2**: Quando l'AI viene riportata sulla pista corretta (guardare i
  tipi), il fix proposto sarà di **1-3 righe** in **1 solo file**. Se
  diventa più grosso, qualcosa è andato storto.

## Note operative per Architetto futuro

Prima sfida di calibrazione del modello stima. Sono incerto su:
- Se il messaggio d'errore "Expected left to be defined" sia abbastanza
  ovvio da rendere il bug troppo facile. Possibile sottostima della
  difficoltà.
- Se 30-90 minuti sia realistico o se Ray (primo punto-dati) lo farà
  più velocemente o più lentamente. Da calibrare con la sua esperienza.
