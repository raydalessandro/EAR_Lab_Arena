# _template-round/

> Questa cartella è uno **scheletro didattico**, non un round vero.

Mostra il formato dei file di orchestrazione che vivono in
`.orchestrazione/sfida-NN-nome/`:

- `briefing-per-ray.md` — descrizione del sintomo riproducibile, scritta
  da Architetto al momento dell'armamento, per uso di Ray quando
  costruisce il prompt iniziale a Sfidante.
- `log-orchestrazione.md` — diario delle mosse di Ray durante il round.
- `POST-MORTEM.md` — rivelazione del bug + analisi, compilato a round
  chiuso da Architetto e Ray.

## A cosa serve

- **A Claude Architetto**: quando arma una nuova sfida, copia questi
  template in `.orchestrazione/sfida-NN-nome/` e li compila.
- **A chi arriva sul repo da fuori**: per capire il formato di un round
  senza dover aprire `.orchestrazione/` di un round specifico.

## Cosa NON c'è qui

- Non c'è codice. Il codice della codebase armata vive direttamente in
  `sfida-NN-nome/` sul main come modulo isolato.
- Non c'è la chiave del bug. La rivelazione privata vive in
  `.architetto/sfida-NN-nome-postmortem-key.md`, separata dal
  post-mortem pubblico (e va aperta solo a round chiuso, da Architetto).
