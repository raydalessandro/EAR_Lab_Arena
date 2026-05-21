# Sfida 03 — binary-parser — chiave del post-mortem

## Caso reale di partenza

- Repo upstream: `webtoon/psd`
- Issue: https://github.com/webtoon/psd/issues/40 ("invalid typed array length error opening Photopea PSD")
- PR del fix: https://github.com/webtoon/psd/pull/42 ("fix: handle empty channel data")
- SHA pre-fix (= stato della codebase armata): `22fa483`
- SHA del fix in upstream: `9cd2d8f` (autore: Ye-hyoung Kang). Mergiato il 2022-07-28.

## Il bug

**File**: `sfida-03-binary-parser/src/sections/LayerAndMaskInformation/readLayerRecordsAndChannels.ts`
**Punto**: il calcolo dello skip per le scan lines di un channel.

Il codice calcolava il numero di byte da skippare per un channel come `scanLines * bytesPerScanline` (ipotizzando che ogni channel avesse sempre dati). Per i layer di tipo **gradient fill** prodotti da editor di terze parti (Photopea in particolare), il `channelDataLength` di certi channel è **0** — non c'è nessun dato da skippare. Quando il codice provava comunque a skip-are `scanLines * bytesPerScanline` byte, il cursor andava oltre i bounds del buffer. La successiva allocazione di un `Uint8Array(buffer, offset, length)` con offset/length out-of-range produceva `RangeError: Invalid typed array length`.

## Il fix

Limitare il numero di byte skippati al `channelDataLength` effettivo:

```ts
const skip = Math.min(channelDataLength, scanLines * bytesPerScanline);
```

(Vedere diff originale alla PR per la forma esatta: il fix è di +4/-1 righe.)

## Catena di ragionamento attesa dal candidato

1. Notare che la suite di test esistente non riproduce il bug — è un test review, non test-driven.
2. Studiare la struttura `src/sections/`, costruire un modello mentale del formato PSD: file header → color mode data → image resources → **layer and mask information** → image data.
3. Identificare nella sezione layer/mask il punto dove i channel di ciascun layer vengono iterati: `readLayerRecordsAndChannels.ts`.
4. Trovare il calcolo `skip = scanLines * bytesPerScanline` e chiedersi: "è sempre `<=` channelDataLength?"
5. Cercare il punto dove `channelDataLength` viene letto dal buffer del layer record (è dichiarato nei campi del layer, non calcolato). Capire che può essere 0 per channel "vuoti" (gradient fill).
6. Aggiungere la guardia `Math.min(channelDataLength, ...)`.

## Skill esercitata in Ray

"Quando il sintomo è un crash di allocazione (`RangeError: Invalid typed array length`), risali la pipeline di letture: dove viene calcolato il length, quale assunzione lo lega a un campo del buffer che potrebbe essere 0? In dominio binary parsing, ogni 'length zero' è un caso edge che può violare quell'assunzione."

## Adattamenti dichiarati nel briefing (NON sono il bug)

- Fixtures `tests/integration/fixtures/example/` rimosse (4.7 MB di file PSD generici, irrilevanti per il bug).
- Test file `tests/integration/example.test.ts` rimosso (dipende dalle fixtures rimosse).
- `src/methods/generateRgba.ts`: l'import `@webtoon/psd-decoder` (package del monorepo upstream, non pubblicato indipendentemente) è stato stubbato con un mock locale. Le funzioni esportate lanciano errori espliciti al runtime ma type-check resta verde. Il bug NON vive in `generateRgba` né a valle del decoder.
