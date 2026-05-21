# Albo d'oro

L'elenco di tutti i round giocati, in ordine cronologico.

## Formato

| Round | Data | Codebase | Tipo bug | Esito | Branch | Post-mortem |
|------:|:----:|:---------|:---------|:------|:-------|:------------|

## Round giocati

| Round | Data | Codebase | Tipo bug | Esito | Branch | Post-mortem |
|------:|:----:|:---------|:---------|:------|:-------|:------------|
| 01 | armata 2026-05-21 | filter engine Lucene-like (TS, ~1.3k LOC src) | semantico, AST exhaustiveness | in corso | `sfida-01-query-filter` | — |
| 02 | armata 2026-05-21 | scheduler cron (TS/Deno, ~2.3k LOC src) | semantico, parser modifier | in corso | `sfida-02-scheduler` | — |
| 03 | armata 2026-05-21 | parser file binario PSD (TS, ~3.7k LOC src) | semantico, edge case empty buffer | in corso | `sfida-03-binary-parser` | — |

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
