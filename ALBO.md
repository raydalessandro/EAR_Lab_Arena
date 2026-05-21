# Albo d'oro

L'elenco di tutti i round giocati, in ordine cronologico.

## Formato

| Round | Data | Modulo | Tipo bug | Esito | Cartella | Post-mortem |
|------:|:----:|:-------|:---------|:------|:---------|:------------|

## Round giocati

| Round | Data | Modulo | Tipo bug | Esito | Cartella | Post-mortem |
|------:|:----:|:-------|:---------|:------|:---------|:------------|
| 01 | 2026-05-21 | filter engine Lucene-like (TS, ~1.3k LOC src) | semantico, AST exhaustiveness | **non-sfida (errore calibrazione)** | `query-filter/` | classe archiviata in `BUG-TAXONOMY.md` come anti-pattern |
| 02 | 2026-05-21 | scheduler cron (TS/Deno, ~2.3k LOC src) | semantico, parser modifier | **non-sfida (errore calibrazione)** | `scheduler/` | idem |
| 03 | 2026-05-21 | parser file binario PSD (TS, ~3.7k LOC src) | semantico, edge case empty buffer | **non-sfida (errore calibrazione)** | `binary-parser/` | idem |

> Le 3 sfide della prima calibrazione sono state archiviate come
> "non-sfide": Ray ha individuato il bug esatto della Sfida 01 dal solo
> briefing, senza aprire il codice e senza usare AI. Conferma che bug
> semantici inferibili dalla sola codebase non sono scenari di palestra
> per orchestratori. Le cartelle restano nel repo come materiale
> didattico (cosa NON è palestra). Vedi `BUG-TAXONOMY.md` voce
> "anti-pattern: bug semantico inferibile da modulo singolo".

---

## Legenda degli esiti

- **Vittoria Ray**: bug trovato e fixato con test che dimostra la
  correzione.
- **Vittoria Claude**: Ray si è arreso, o il tempo concordato è scaduto
  senza soluzione.
- **Pareggio**: bug trovato ma fix incompleto, oppure trovato per pura
  fortuna senza ragionamento.
- **Round invalido**: il bug violava la Regola 3 (non era inferibile).
  Non conta.

## Riepilogo cumulativo

- Vittorie Ray: 0
- Vittorie Claude: 0
- Pareggi: 0
- Invalidi: 0
