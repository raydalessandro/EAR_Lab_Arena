# _template-round/

> Questa cartella è uno **scheletro didattico**, non un round vero.

Mostra il formato dei file di orchestrazione che vivono in
`.orchestrazione/sfida-NN-modulo/`:

- `briefing-per-ray.md` — descrizione del sintomo riproducibile, scritta
  da Architetto al momento dell'armamento, per uso di Ray quando
  costruisce il prompt iniziale a Sfidante.
- `PRE-ROUND.md` — griglia di pensiero che Ray compila **prima** di
  aprire la sessione Sfidante (sintomo in 2 frasi, cosa non sa,
  decisioni chiuse, blast radius previsto, primo prompt, criterio di
  "fatto"). Derivato dai pattern del libro *Dal Campo alla Terra*.
- `log-orchestrazione.md` — log delle mosse significative di Ray.
  Si compila **retrospettivamente** a fine round, leggendo la transcript
  della sessione Sfidante. Non si scrive in tempo reale durante il flow.
- `POST-ROUND.md` — diario privato di Ray come orchestratore (cosa ha
  funzionato, cosa lo ha sviato, pattern di mossa estratto, metafora).
  Stile LEARNINGS dal libro.
- `POST-MORTEM.md` — rivelazione del bug + analisi condivisa Architetto
  e Ray, compilato a round chiuso.

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
