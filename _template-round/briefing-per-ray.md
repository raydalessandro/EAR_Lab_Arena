# Briefing per Ray — Sfida NN — [nome breve]

> Questo file lo scrive **Claude Architetto** quando arma la sottocartella.
> Vive in `.orchestrazione/sfida-NN-nome/briefing-per-ray.md`,
> **non** dentro la sottocartella della sfida.
>
> È quello che **Ray legge prima di aprire la sessione Sfidante**, per
> costruire il prompt iniziale stile bug report. Sfidante non vede mai
> questo file.

## Caso reale di partenza

- **Repo upstream**: [link al repo originale OSS]
- **Issue / PR di fix**: [link]
- **SHA pre-fix** (= stato della codebase armata): [SHA]
- **Linguaggio principale**: [TypeScript / Deno / Python / ecc.]
- **Dimensioni indicative**: [~N file, ~N righe]
- **Setup**: [comandi per girare i test esistenti dalla sottocartella]

## Sintomo riproducibile

> Il sintomo onesto e concreto. Quello che Ray racconterà a Sfidante
> come se fosse un bug report ricevuto dal team o dai clienti.
> NON rivela dove guardare, NON nomina il bug. Dice solo *cosa si rompe
> e dove si vede*, e fornisce un esempio minimale per riprodurlo.

[2-4 frasi: cosa fa il modulo, e qual è il sintomo osservabile del bug
(es. "il comando X fallisce con messaggio Y", "il filter restituisce
errore quando input è W", "alcuni file fanno crashare il parser con
RangeError").]

[Esempio di riproduzione minimale, in pseudo-codice o snippet reale che
Ray può copiare nel prompt iniziale.]

## Adattamenti dichiarati (non sono il bug)

> Se la codebase è stata semplificata per la palestra (dipendenze
> rimosse, fixtures pesanti tagliate, file branded eliminati), li
> elenchiamo qui per onestà. Ray ne è informato.

- [Es. "fixtures `tests/integration/fixtures/example/` rimosse per
  contenere dimensione"]
- [Es. "package `@xxx/decoder` stubbato perché interno al monorepo
  upstream"]

## Vincoli del round

- **Istanze AI di supporto consentite**: [es. "una sola sessione Claude
  Code come Sfidante; Ray può consultare un'AI separata per pareri ma
  non rivela il bug a Sfidante"].
- **Tempo a disposizione**: [es. "nessun limite", oppure "2 ore reali"].
- **Aiuti esterni consentiti**: [es. "documentazione ufficiale sì;
  ricerca del fix online no"].

## Stato del round

- [ ] Sottocartella armata e pushata sul main (Architetto)
- [ ] Briefing per Ray scritto (Architetto)
- [ ] Chiave del bug scritta in `.architetto/` (Architetto)
- [ ] Sessione Sfidante aperta con cwd nella sottocartella (Ray)
- [ ] Bug ipotizzato (Sfidante + Ray)
- [ ] Bug confermato con test diagnostico (Sfidante + Ray)
- [ ] Fix applicato (Sfidante)
- [ ] Test che dimostra il fix (Sfidante)
- [ ] Round chiuso, post-mortem aperto (Architetto + Ray)
