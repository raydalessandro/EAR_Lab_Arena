# _template-round/

> Questa cartella è uno **scheletro didattico**, non un round vero.

Mostra come è strutturato un round dell'arena: i tre file canonici
(`INIZIO.md`, `log-orchestrazione.md`, `POST-MORTEM.md`) e il loro
contenuto previsto.

## A cosa serve

- **A Claude Architetto**: quando arma una nuova branch `sfida-NN-nome`,
  copia questi tre file dalla cartella `_template-round/` dentro la
  radice della branch armata, e poi li compila secondo il round.

- **A Claude Sfidante**: per capire al volo cosa aspettarsi trovando
  questi file nella sua branch di lavoro.

- **A chi arriva sul repo da fuori**: per capire il formato di un round
  senza dover navigare nelle branch storiche.

## Cosa NON c'è qui

- Non c'è codice. Il codice della codebase del round vive nel main
  (versione pulita) e nelle branch armate (versione bug-ata).
- Non c'è patch.diff. Il bug viene committato direttamente da
  Architetto sulla branch, non passa mai per un file di transito
  (vedi [`../AGENTI.md`](../AGENTI.md)).
- Non c'è soluzione. La soluzione è dentro `POST-MORTEM.md` di ogni
  round, nelle branch archiviate.
