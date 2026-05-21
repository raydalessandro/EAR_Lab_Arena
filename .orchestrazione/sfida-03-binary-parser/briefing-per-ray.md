# Briefing per Ray — Sfida 03 — binary-parser

> Riservato a Ray. Lo Sfidante non lo legge.
>
> Da questo file Ray costruisce il prompt iniziale stile bug report da
> dare a Sfidante quando apre la sessione con `cwd` in
> `sfida-03-binary-parser/`.
>
> **Carattere di questo round**: code review più che test-driven. La
> suite esistente passa verde, le fixtures incluse non triggerano il
> bug. Sfidante deve diagnosticare via reasoning e costruire un test
> diagnostico mirato. È il round più impegnativo dei primi tre — tienine
> conto nelle aspettative di tempo.

## Caso reale di partenza

- Vedi `.architetto/sfida-03-binary-parser-postmortem-key.md` per repo
  upstream, issue/PR, SHA. (Ray non aprire fino a round chiuso.)
- Linguaggio: TypeScript (Node 18+, test runner vitest).
- Dimensioni: ~64 file `.ts` src (~3.700 righe), 2 file di test +
  ~860 KB di fixtures `.psd` per error-case tests.
- Setup dalla sottocartella: `npm install && npm test`. La suite passa
  verde — è il baseline.

## Cosa fa il modulo

Parser per il formato file PSD (Photoshop) e PSB. Espone
`PSD.parse(buffer: ArrayBuffer): Psd` che, dato il contenuto binario di
un file `.psd`, restituisce una struttura di Layer/Group/Slice con
metadata.

Il formato PSD è composito: file header → color mode data → image
resources → layer & mask information → image data. Ogni layer contiene
uno o più "channel" (red, green, blue, alpha, mask, ecc.) ciascuno con
i propri scan lines compressi/non compressi. Il parsing scorre il
buffer sequenzialmente, leggendo offsets, length e poi skippando o
consumando i dati di ciascun channel.

## Sintomo da raccontare a Sfidante

Esempio di prompt iniziale:

> "Lavoriamo su questo modulo `binary-parser`. Un cliente ci ha mandato
> dei file PSD prodotti con un editor di terze parti (non Photoshop) —
> in particolare file che includono layer di tipo gradient fill — e ci
> dice che il parser crasha con `RangeError: Invalid typed array length`.
> Lo stack porta in basso nella pipeline di parsing, in un punto dove si
> alloca un Uint8Array. I file PSD canonical prodotti da Photoshop non
> hanno il problema. Le nostre fixture di test esistenti non riproducono
> il caso — la suite passa verde. Capisci dove sta il problema, scrivi
> un test diagnostico che lo coglie, e sistemalo. Stai dentro al modulo."

Suggerimenti di orchestrazione:

- Sfidante può/deve consultare la **spec ufficiale PSD di Adobe** per
  capire cosa "dovrebbe" essere presente in un channel di un layer. È
  documentazione pubblica, è aiuto lecito.
- La struttura `src/sections/` riflette la struttura del formato. Per
  trovare il bug occorre arrivare alla sezione layer & mask information,
  e dentro a essa al punto dove si leggono i channel di ciascun layer.
- Il bug emerge per `channelDataLength === 0` (caso edge che gli editor
  di terze parti producono e Photoshop no). Se Sfidante non lo coglie
  da solo, una mossa di orchestrazione utile è chiedergli "quali campi
  di un layer record possono ragionevolmente essere zero o vuoti?"

## Adattamenti dichiarati (non sono il bug)

- Fixtures `tests/integration/fixtures/example/` rimosse (4.7 MB di
  file PSD generici, irrilevanti per il bug).
- Test file `tests/integration/example.test.ts` rimosso (dipendeva da
  quelle fixtures).
- `src/methods/generateRgba.ts`: l'import `@webtoon/psd-decoder` (package
  interno al monorepo upstream, non pubblicato indipendentemente) è
  stato stubbato con un mock locale. Le funzioni esportate lanciano
  errori espliciti al runtime ma type-check resta verde. **Il bug NON
  vive in `generateRgba` né a valle del decoder.**
- `README.md`, `CHANGELOG.md`, `.release-it.json`, `.npmignore` del
  package upstream rimossi.
- `package.json` ripulito di `name`, `author`, `contributors`,
  `homepage`, `repository`.
- Header copyright MIT nei file source intatti (rispetto licenza). Il
  nome dell'organizzazione nell'header non è una pista lecita.

## Vincoli del round

- Istanze AI di supporto: una sola sessione Sfidante.
- Tempo: nessun limite formale. Aspettati un round più lungo dei primi
  due.
- Aiuti esterni: spec PSD ufficiale Adobe sì; ricerca del fix nel repo
  upstream no.

## Stato del round

- [x] Sottocartella armata e pushata sul main (Architetto)
- [x] Briefing per Ray scritto (Architetto)
- [x] Chiave del bug scritta in `.architetto/` (Architetto)
- [ ] Sessione Sfidante aperta con cwd nella sottocartella (Ray)
- [ ] Bug ipotizzato (Sfidante + Ray)
- [ ] Bug confermato con test diagnostico (Sfidante + Ray)
- [ ] Fix applicato (Sfidante)
- [ ] Test che dimostra il fix (Sfidante)
- [ ] Round chiuso, post-mortem aperto (Architetto + Ray)
