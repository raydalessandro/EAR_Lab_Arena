# Briefing per Ray — Sfida 01 — query-filter

> Riservato a Ray. Lo Sfidante non lo legge.
>
> Da questo file Ray costruisce il prompt iniziale stile bug report da
> dare a Sfidante quando apre la sessione con `cwd` in
> `sfida-01-query-filter/`. Sfidante crede di lavorare a un modulo
> reale di produzione, non a una sfida.

## Caso reale di partenza

- Vedi `.architetto/sfida-01-query-filter-postmortem-key.md` per repo
  upstream, issue/PR, SHA. (Ray non aprire fino a round chiuso.)
- Linguaggio: TypeScript (Node 12+), test runner ava.
- Dimensioni: ~21 file `.ts` src (~1.300 righe), ~11 file test (~3.500 righe).
- Setup dalla sottocartella: `npm install && npm test`.

## Cosa fa il modulo

Filtraggio di array di oggetti tramite query string in stile Lucene. API
pubblica principale:

- `parse(query: string): LiqeQuery` — query string → AST
- `filter(ast: LiqeQuery, data: T[]): T[]` — applica l'AST all'array
- `test(ast: LiqeQuery, item: T): boolean` — testa un singolo elemento

Sintassi supportata: condizioni `campo:valore`, operatori logici
`AND`/`OR`/`NOT`, **parentesi per raggruppare**
(es. `(name:foo AND bio:bar) OR name:fox`).

## Sintomo da raccontare a Sfidante

Inquadralo come segnalazione utente. Esempio di prompt iniziale che puoi
usare (o riformulare a tuo gusto):

> "Lavoriamo su questo modulo `query-filter`. Sto ricevendo segnalazioni
> da utenti che riportano un errore quando le query usano parentesi per
> raggruppare condizioni. Esempio concreto che hanno mandato:
> `filter(parse('(name:foo AND bio:bar) OR name:fox'), data)` lancia
> errore. Le stesse query senza parentesi funzionano. `parse()` da solo
> non si lamenta, il problema esce quando passi l'AST a `filter()` (o
> `test()`). Riproduci, diagnostica, sistema. Stai dentro al modulo, il
> resto del repo appartiene ad altri team."

Esempio di codice riproducibile (mettilo nel prompt se Sfidante chiede):

```ts
const data = [
  { name: 'foo', bio: 'bar' },
  { name: 'fox', bio: 'baz' },
];

// Funziona:
filter(parse('name:foo AND bio:bar'), data);

// Funziona:
filter(parse('name:foo OR name:fox'), data);

// FALLISCE:
filter(parse('(name:foo AND bio:bar) OR name:fox'), data);
```

## Adattamenti dichiarati (non sono il bug)

- `package.json` ripulito di `name`/`repository`/`homepage`/`author`,
  rinominato `sfida-01-codebase`.
- File `README.md` originale del repo upstream rimosso.
- `test/liqe/` rinominato in `test/unit/` per ridurre indizi diretti al
  repo.
- Commenti `// https://github.com/...` rimossi dai file di test.
- `test/benchmark.ts` rimosso (conteneva il nome dell'autore del repo
  upstream).
- I nomi interni del codice (`LiqeQuery`, classi, simboli) sono rimasti
  intatti — sarebbero stati invasivi da rinominare. Se Sfidante propone
  di cercare il nome del simbolo fuori dal repo, fermalo.

## Vincoli del round

- Istanze AI di supporto: una sola sessione Claude Code come Sfidante.
  Ray può consultare un'altra AI per pareri ma non rivela il bug a
  Sfidante.
- Tempo: nessun limite formale.
- Aiuti esterni: documentazione TS/Node/ava sì; ricerca del fix
  originale online no.

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
