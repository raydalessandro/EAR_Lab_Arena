# Stima Architetto — Sfida 03 — binary-parser

> Scritto da Claude Architetto prima del push. **Ray, non aprire fino
> a chiusura del round.**

## Classe del bug

- **Classe**: **"Assunzione implicita di non-vuoto in pipeline binary
  parser, non testata dalla suite esistente"** — il codice ipotizza che
  un certo campo length (letto dal buffer) sia sempre > 0, ma per certi
  input edge è 0. Il calcolo che lo usa va out-of-bounds. La suite di
  test esistente non contiene fixture che producano quell'input edge,
  quindi è verde.
- **Status nella tassonomia**: candidata-nuova. È molto diversa dalla
  classe della sfida 01 e 02 — questa è la prima che vede il caso
  **"suite verde ma bug presente"**, che è epistemologicamente molto
  diverso dal "bug riproducibile da un test che fallisce".
- **Caratteristica per orchestratore**: niente segnale da inseguire.
  L'AI non ha un test che fallisce da cui partire. L'orchestratore deve
  **dirigere l'AI a ragionare staticamente** sulla codebase, a chiedersi
  "quali assunzioni di questo codice possono essere violate da input
  legali ma rari?". È una forma di code review più che debug. Aggravante:
  dominio binary parsing richiede di costruire un modello mentale del
  formato prima di poter cercare il bug.

## Difficoltà attesa

- **Scala**: **4/5** (tosto)
- **Perché**: combinazione di (a) niente test che fallisce,
  (b) codebase più grande dei primi due (~3.700 LOC),
  (c) dominio binary parsing che impone setup mentale,
  (d) l'AI può facilmente proporre fix difensivi non centrati.

## Tempo atteso

- **Range**: **3-8 ore**, possibile resa
- **Punto di rottura**: oltre le 8-10 ore senza progresso, è onesto
  arrendersi. Vale come dato anche la sconfitta.

## Catena di ragionamento prevista

1. Lanciare `npm test`, constatare che tutto passa.
2. Realizzare che il bug è nel codice ma non nella suite — quindi non
   c'è un test che fallisce da cui partire.
3. Studiare la struttura `src/sections/` per capire come il formato
   PSD è organizzato. Costruire mentalmente: file header → color mode
   data → image resources → layer & mask information → image data.
4. Capire che il sintomo (RangeError invalid typed array length)
   suggerisce un'allocazione fallita. Cercare dove si fanno
   `new Uint8Array(buffer, offset, length)` con offset/length presi
   dal buffer.
5. Identificare la sezione layer & mask information come la più probabile
   (contiene loop sui channel di ciascun layer).
6. Aprire `readLayerRecordsAndChannels` o equivalente. Trovare il
   calcolo `skip = scanLines * bytesPerScanline` o simile.
7. Chiedersi: cosa lega questa quantità al length del channel? Esiste
   un'asimmetria fra cosa il calcolo assume e cosa il campo length
   dichiara?
8. Costruire un test diagnostico che simuli `channelDataLength === 0`
   chiamando direttamente la funzione interna con un buffer mock.
9. Verificare che il test fallisce, applicare il fix `Math.min(...)`,
   verificare che il test passa.

## Rabbit hole probabili

- **Rabbit hole 1 — "stack trace"**: l'AI parte dal punto dove
  `RangeError` viene lanciato (in `new Uint8Array(...)`), ma quel punto
  è 3-4 frame valle del bug vero. L'orchestratore deve farla risalire,
  non guardare il sito di lancio.
- **Rabbit hole 2 — "decoder WASM"**: l'AI potrebbe sospettare il
  decoder (stubbato per la palestra) come causa. Va detto subito che il
  bug è upstream del decoder.
- **Rabbit hole 3 — "fix difensivo generico"**: l'AI propone di
  avvolgere chiamate in try/catch o controlli `if (length > 0)` ovunque
  senza capire la causa. Patcha il sintomo, non il bug.
- **Rabbit hole 4 — "spec PSD esaustiva"**: l'orchestratore può perdere
  ore a leggere la spec ufficiale Adobe (1000+ pagine). Usarla
  selettivamente come riferimento, non come lettura sequenziale.
- **Rabbit hole 5 — "tutti i Uint8Array del codice"**: greppare
  `Uint8Array` produce decine di occorrenze. L'orchestratore deve
  restringere via reasoning sul formato, non via grep.

## Prediction esplicita

- **P1**: L'orchestratore tenterà come prima mossa di costruire un test
  che chiami `PSD.parse()` direttamente, e cercherà / chiederà un file
  PSD con gradient. Non avendolo, dovrà ripiegare su test diagnostico
  di funzione interna. **Questa transizione è il primo ostacolo
  cognitivo serio**.
- **P2**: Se l'orchestratore raggiunge il punto giusto della codebase
  (`readLayerRecordsAndChannels` o equivalente), l'AI con il file aperto
  ha buone probabilità di proporre il fix entro 1-2 mosse — la zona è
  piccola e il pattern `Math.min` è canonical. La difficoltà è
  **arrivarci**, non risolverlo una volta lì.

## Note operative per Architetto futuro

- Round candidato a essere il primo "**sconfitta documentata**" della
  palestra. La sconfitta è materiale prezioso per il libro 3 quanto la
  vittoria.
- Se Ray si arrende, è interessante chiedergli a posteriori "dopo
  quante ore hai capito che non ce l'avresti fatta?" — è un dato sulla
  consapevolezza dell'orchestratore della propria curva di rendimento.
- Possibile che la classe "suite verde ma bug presente" si dimostri così
  diversa da "test che fallisce" da diventare il **primo split
  fondamentale** della tassonomia, sopra a tutte le altre dimensioni.
